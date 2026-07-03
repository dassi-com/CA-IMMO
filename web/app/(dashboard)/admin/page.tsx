// web/app/dashboard/admin/page.tsx - Version corrigée :

'use client';

import { useState, useEffect } from 'react';
import {
  Users,
  Building2,
  Clock,
  DollarSign,
  TrendingUp,
  CheckCircle,
  XCircle,
  Star,
  Search,
  MoreVertical,
  Shield,
  Mail,
  Phone,
  Calendar,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/dashboard/Sidebar';
import StatsCard from '@/components/dashboard/StatsCard';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { adminService } from '@/services/adminService';
import { User } from '@/services/authService';
import { propertyService } from '@/services/propertyService';
import { Property } from '@/types/property';
import toast from 'react-hot-toast';

interface PendingListing {
  id: string;
  title: string;
  agentName: string;
  agentEmail: string;
  date: string;
  price: string;
  type: string;
}

interface PaymentRequest {
  id: string;
  agentName: string;
  amount: number;
  package: string;
  date: string;
  status: string;
  reference: string;
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({ totalUsers: 0, totalListings: 0, pendingListings: 0, totalRevenue: 0 });
  const [users, setUsers] = useState<User[]>([]);
  const [pendingListings, setPendingListings] = useState<PendingListing[]>([]);
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [fetchedUsers, fetchedPending] = await Promise.all([
        adminService.getAllUsers().catch(() => []),
        propertyService.getPending().catch(() => []),
      ]);
      setUsers(fetchedUsers);
      setPendingListings(fetchedPending.map((p: Property) => ({
        id: p.id,
        title: p.title,
        agentName: p.owner?.full_name || 'Inconnu',
        agentEmail: p.owner?.email || '',
        date: new Date(p.created_at).toLocaleDateString(),
        price: `${p.price.toLocaleString()} ${p.currency}`,
        type: p.property_type,
      })));
      const allProperties = await propertyService.getAll().catch(() => []);
      setStats({
        totalUsers: fetchedUsers.length,
        totalListings: allProperties.length + fetchedPending.length,
        pendingListings: fetchedPending.length,
        totalRevenue: 0,
      });
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await propertyService.updateStatus(id, 'APPROVED');
      toast.success('Annonce approuvée');
      loadData();
    } catch {
      toast.error("Erreur lors de l'approbation");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await propertyService.updateStatus(id, 'REJECTED');
      toast.success('Annonce rejetée');
      loadData();
    } catch {
      toast.error('Erreur lors du rejet');
    }
  };

  const handleFeature = async (id: string) => {
    try {
      await propertyService.setFeatured(id);
      toast.success('Annonce mise en avant');
      loadData();
    } catch {
      toast.error('Erreur lors de la mise en avant');
    }
  };

  const handleSuspend = async (userId: string) => {
    try {
      await adminService.suspendUser(userId);
      toast.success('Utilisateur suspendu');
      loadData();
    } catch {
      toast.error('Erreur lors de la suspension');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await adminService.deleteUser(userId);
      toast.success('Utilisateur supprimé');
      loadData();
    } catch {
      toast.error('Erreur lors de la suppression');
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar role="admin" isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-24'}`}>
        <div className="p-6 lg:p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-800">Bonjour, Admin</h1>
            <p className="text-gray-600 mt-2">Supervision de la plateforme CentralAfricaHomes</p>
          </motion.div>

          {/* Stats Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl" />
                    <div className="w-16 h-4 bg-gray-200 rounded" />
                  </div>
                  <div className="h-8 bg-gray-200 rounded w-1/2 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Utilisateurs"
              value={stats.totalUsers}
              icon={Users}
              color="from-blue-500 to-cyan-500"
              delay={0.1}
            />
            <StatsCard
              title="Annonces totales"
              value={stats.totalListings}
              icon={Building2}
              color="from-green-500 to-emerald-500"
              delay={0.2}
            />
            <StatsCard
              title="En attente"
              value={stats.pendingListings}
              icon={Clock}
              color="from-yellow-500 to-orange-500"
              delay={0.3}
            />
            <StatsCard
              title="Revenus"
              value={stats.totalRevenue ? `${(stats.totalRevenue / 1000000).toFixed(1)}M FCFA` : '0 FCFA'}
              icon={DollarSign}
              color="from-purple-500 to-indigo-500"
              delay={0.4}
            />
          </div>
          )}



          {/* Pending Listings Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Annonces à valider</h2>
            </div>
            {loading ? (
              <SkeletonTable rows={5} />
            ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Titre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Agent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prix
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pendingListings.map((listing) => (
                    <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{listing.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-gray-900">{listing.agentName}</div>
                          <div className="text-sm text-gray-500">{listing.agentEmail}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{listing.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-red-600">{listing.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">{listing.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleApprove(listing.id)} className="p-1.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                            <CheckCircle size={18} />
                          </button>
                          <button onClick={() => handleReject(listing.id)} className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                            <XCircle size={18} />
                          </button>
                          <button onClick={() => handleFeature(listing.id)} className="p-1.5 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors">
                            <Star size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            )}
          </motion.div>

          {/* Users Management and Payment Requests Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Users Management */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Gestion des utilisateurs</h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
              </div>
              {loading ? (
                <SkeletonTable rows={5} />
              ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nom
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rôle
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{user.full_name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              user.role === 'ADMIN'
                                ? 'bg-purple-100 text-purple-600'
                                : user.role === 'OWNER'
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              !user.is_suspended ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                            }`}
                          >
                            {user.is_suspended ? 'Suspendu' : 'Actif'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleSuspend(user.id)} className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                              <Shield size={18} />
                            </button>
                            <button onClick={() => handleDeleteUser(user.id)} className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors">
                              <XCircle size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              )}
            </motion.div>

            {/* Payment Requests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Demandes de mise en avant récentes</h3>
              <div className="space-y-3">
                {paymentRequests.map((payment) => (
                  <div key={payment.id} className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-800">{payment.agentName}</h4>
                        <p className="text-sm text-gray-600">{payment.package}</p>
                      </div>
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          payment.status === 'confirmed'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-yellow-100 text-yellow-600'
                        }`}
                      >
                        {payment.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{payment.date}</span>
                      <span className="font-bold text-red-600">{payment.amount.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
                        Confirmer
                      </button>
                      <button className="flex-1 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors">
                        Rejeter
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>


        </div>
      </main>
    </div>
  );
}