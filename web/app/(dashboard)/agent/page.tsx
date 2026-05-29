'use client';

import { useState, useEffect } from 'react';
import {
  Building2,
  CheckCircle,
  Clock,
  Eye,
  TrendingUp,
  Users,
  MessageSquare,
  Edit,
  Trash2,
  Star,
  DollarSign,
  Calendar,
  Send,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Sidebar from '@/components/dashboard/Sidebar';
import StatsCard from '@/components/dashboard/StatsCard';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { propertyService } from '@/services/propertyService';
import { Property } from '@/types/property';
import { inquiryService, Inquiry } from '@/services/inquiryService';
import { featureRequestService } from '@/services/featureRequestService';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

interface ListingRow {
  id: string;
  title: string;
  status: string;
  date: string;
}

interface PendingRow {
  id: string;
  title: string;
  date: string;
  type: string;
  price: string;
}

export default function AgentDashboard() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<ListingRow[]>([]);
  const [pendingListings, setPendingListings] = useState<PendingRow[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  const totalListings = listings.length;
  const activeListings = listings.filter(l => l.status === 'APPROVED').length;
  const pendingCount = pendingListings.length;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [myListings, myInquiries] = await Promise.all([
        propertyService.getMyListings().catch(() => []),
        inquiryService.getMyReceivedInquiries().catch(() => []),
      ]);

      setListings(myListings.map((p: Property) => ({
        id: p.id,
        title: p.title,
        status: p.status,
        date: new Date(p.created_at).toLocaleDateString(),
      })));

      setPendingListings(myListings.filter((p: Property) => p.status === 'PENDING').map((p: Property) => ({
        id: p.id,
        title: p.title,
        date: new Date(p.created_at).toLocaleDateString(),
        type: p.property_type,
        price: `${p.price.toLocaleString()} ${p.currency}`,
      })));

      setInquiries(myInquiries);
    } catch (error) {
      console.error('Error loading agent data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await propertyService.delete(id);
      toast.success('Annonce supprimée');
      loadData();
    } catch {
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleRequestFeatured = async () => {
    try {
      await featureRequestService.create({ target: 'AGENT', target_id: user!.id });
      toast.success('Demande de mise en avant envoyée avec succes');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Erreur lors de la demande');
    }
  };

  const userName = user?.full_name || 'Agent';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar role="agent" isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-24'}`}>
        <div className="p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Bonjour, {userName}</h1>
                <p className="text-gray-600 mt-2">Gerer vos proprietes et suivre vos performances</p>
              </div>
              {!user?.is_featured && (
                <button
                  onClick={handleRequestFeatured}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl text-sm font-medium hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg"
                >
                  <Star size={16} />
                  Demander la mise en avant
                </button>
              )}
              {user?.is_featured && (
                <div className="flex items-center gap-2 px-4 py-2.5 bg-yellow-50 text-yellow-700 rounded-xl text-sm font-medium">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  Agent en avant
                </div>
              )}
            </div>
          </motion.div>

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
              title="Total annonces"
              value={totalListings}
              icon={Building2}
              color="from-blue-500 to-cyan-500"
              delay={0.1}
            />
            <StatsCard
              title="Annonces actives"
              value={activeListings}
              icon={CheckCircle}
              color="from-green-500 to-emerald-500"
              delay={0.2}
            />
            <StatsCard
              title="En attente"
              value={pendingCount}
              icon={Clock}
              color="from-yellow-500 to-orange-500"
              delay={0.3}
            />
            <StatsCard
              title="Messages reçus"
              value={inquiries.length}
              icon={Eye}
              color="from-purple-500 to-indigo-500"
              delay={0.4}
            />
          </div>
          )}



          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Dernières annonces</h2>
            </div>
            {loading ? (
              <SkeletonTable rows={5} />
            ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {listings.map((listing) => (
                    <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{listing.title}</div>
                        <div className="text-sm text-gray-500">{listing.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          listing.status === 'APPROVED'
                            ? 'bg-green-100 text-green-600'
                            : listing.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-600'
                            : listing.status === 'REJECTED'
                            ? 'bg-red-100 text-red-600'
                            : 'bg-purple-100 text-purple-600'
                        }`}>
                          {listing.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                            <Edit size={18} />
                          </button>
                          <button onClick={() => handleDelete(listing.id)} className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors">
                            <Trash2 size={18} />
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Annonces en attente</h3>
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="space-y-3">
                {pendingListings.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">Aucune annonce en attente</p>
                ) : (pendingListings.map((listing) => (
                  <div key={listing.id} className="p-3 bg-yellow-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-800">{listing.title}</h4>
                      <span className="text-xs text-yellow-600">En validation</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{listing.type}</span>
                      <span className="text-red-600 font-medium">{listing.price}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400">{listing.date}</span>
                    </div>
                  </div>
                )))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Demandes de visite récentes</h3>
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="space-y-3">
                {inquiries.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">Aucune demande de contact</p>
                ) : (inquiries.map((inq) => (
                  <div key={inq.id} className="p-3 bg-blue-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-800">{inq.name}</h4>
                        <p className="text-sm text-gray-600">{inq.message?.substring(0, 50)}...</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{new Date(inq.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare size={12} />
                        <span>{inq.phone_number}</span>
                      </div>
                    </div>
                  </div>
                )))}
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-lg p-6 text-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                <h3 className="text-xl font-bold">Mettez vos annonces en avant</h3>
              </div>
              <p className="mb-4 opacity-90">
                Augmentez votre visibilité jusqu'à 300% avec nos packages promotionnels
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-white/20 rounded-lg p-3">
                  <div className="text-2xl font-bold">50,000 FCFA</div>
                  <div className="text-xs">1 mois</div>
                </div>
                <div className="bg-white/20 rounded-lg p-3">
                  <div className="text-2xl font-bold">120,000 FCFA</div>
                  <div className="text-xs">3 mois</div>
                </div>
              </div>
              <Link href="/post-property" className="w-full py-3 bg-white text-red-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                <DollarSign size={20} />
                Publier une nouvelle annonce
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Top performances par propriété</h3>
              <div className="space-y-4">
                <p className="text-gray-500 text-sm text-center py-8">
                  Les performances s'afficheront ici une fois vos annonces publiées.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
