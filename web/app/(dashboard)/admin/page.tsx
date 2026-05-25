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
  AlertCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/dashboard/Sidebar';
import StatsCard from '@/components/dashboard/StatsCard';
import ChartCard, {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,  // ← Cell importé ici
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from '@/components/dashboard/ChartCard';
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

interface SystemAlert {
  id: string;
  type: string;
  message: string;
  date: string;
  priority: string;
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({ totalUsers: 0, totalListings: 0, pendingListings: 0, totalRevenue: 0 });
  const [users, setUsers] = useState<User[]>([]);
  const [pendingListings, setPendingListings] = useState<PendingListing[]>([]);
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([]);
  const [systemAlerts] = useState<SystemAlert[]>([
    { id: 'a1', type: 'warning', message: 'Plus de 10 annonces en attente depuis plus de 48h', date: new Date().toISOString().split('T')[0], priority: 'high' },
    { id: 'a2', type: 'info', message: 'Bienvenue sur le tableau de bord administrateur', date: new Date().toISOString().split('T')[0], priority: 'medium' },
  ]);

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
      setStats({
        totalUsers: fetchedUsers.length,
        totalListings: fetchedPending.length + (stats.totalListings || 0),
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

  const handleUnsuspend = async (userId: string) => {
    try {
      await adminService.unsuspendUser(userId);
      toast.success('Utilisateur réactivé');
      loadData();
    } catch {
      toast.error('Erreur lors de la réactivation');
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

  const userRegistrations = [
    { month: 'Sep', tenants: 12, agents: 3, admins: 0 },
    { month: 'Oct', tenants: 18, agents: 5, admins: 0 },
    { month: 'Nov', tenants: 15, agents: 4, admins: 0 },
    { month: 'Dec', tenants: 25, agents: 7, admins: 1 },
    { month: 'Jan', tenants: 20, agents: 6, admins: 0 },
    { month: 'Fév', tenants: 14, agents: 4, admins: 0 },
  ];

  const listingsByStatus = [
    { status: 'APPROVED', count: 280, color: '#10B981' },
    { status: 'PENDING', count: 45, color: '#F59E0B' },
    { status: 'REJECTED', count: 12, color: '#EF4444' },
    { status: 'FEATURED', count: 5, color: '#8B5CF6' },
  ];

  const topCities = [
    { city: 'Yaoundé', count: 145, percentage: 42 },
    { city: 'Douala', count: 128, percentage: 37 },
    { city: 'Bafoussam', count: 32, percentage: 9 },
    { city: 'Garoua', count: 21, percentage: 6 },
    { city: 'Maroua', count: 16, percentage: 5 },
  ];

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
            <h1 className="text-3xl font-bold text-gray-800">Bonjour, Admin 🔐</h1>
            <p className="text-gray-600 mt-2">Supervision de la plateforme CentralAfricaHomes</p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Utilisateurs"
              value={stats.totalUsers}
              icon={Users}
              trend={12}
              trendLabel="vs mois dernier"
              color="from-blue-500 to-cyan-500"
              delay={0.1}
            />
            <StatsCard
              title="Annonces totales"
              value={stats.totalListings}
              icon={Building2}
              trend={8}
              trendLabel="vs mois dernier"
              color="from-green-500 to-emerald-500"
              delay={0.2}
            />
            <StatsCard
              title="En attente"
              value={stats.pendingListings}
              icon={Clock}
              trend={-3}
              trendLabel="vs mois dernier"
              color="from-yellow-500 to-orange-500"
              delay={0.3}
            />
            <StatsCard
              title="Revenus"
              value={stats.totalRevenue ? `${(stats.totalRevenue / 1000000).toFixed(1)}M FCFA` : '0 FCFA'}
              icon={DollarSign}
              trend={25}
              trendLabel="vs mois dernier"
              color="from-purple-500 to-indigo-500"
              delay={0.4}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ChartCard title="Nouvelles inscriptions" icon={TrendingUp} delay={0.2}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userRegistrations}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="tenants" stackId="1" fill="#DC2626" stroke="#DC2626" name="Locataires" />
                  <Area type="monotone" dataKey="agents" stackId="1" fill="#FCA5A5" stroke="#FCA5A5" name="Agents" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Annonces par statut" icon={Building2} delay={0.3}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={listingsByStatus}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="status" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#DC2626" radius={[8, 8, 0, 0]}>
                    {listingsByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Top Cities Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Top villes par nombre d'annonces</h3>
            <div className="space-y-4">
              {topCities.map((city, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-700">{city.city}</span>
                    <span className="text-gray-600 font-medium">
                      {city.count} annonces ({city.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${city.percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

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
                            {user.is_suspended ? (
                              <button onClick={() => handleUnsuspend(user.id)} className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors" title="Réactiver">
                                <Shield size={18} />
                              </button>
                            ) : (
                              <button onClick={() => handleSuspend(user.id)} className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Suspendre">
                                <Shield size={18} />
                              </button>
                            )}
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

          {/* System Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <h2 className="text-xl font-bold text-gray-800">Alertes système</h2>
            </div>
            <div className="space-y-3">
              {systemAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border-l-4 ${
                    alert.priority === 'high'
                      ? 'border-red-500 bg-red-50'
                      : alert.priority === 'medium'
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-green-500 bg-green-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-800">{alert.message}</p>
                      <p className="text-sm text-gray-500 mt-1">{alert.date}</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}