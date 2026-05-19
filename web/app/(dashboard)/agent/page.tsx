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
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Sidebar from '@/components/dashboard/Sidebar';
import StatsCard from '@/components/dashboard/StatsCard';
import ChartCard, {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from '@/components/dashboard/ChartCard';
import { propertyService } from '@/services/propertyService';
import { Property } from '@/types/property';
import { inquiryService, Inquiry } from '@/services/inquiryService';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

interface ListingRow {
  id: string;
  title: string;
  status: string;
  views: number;
  contacts: number;
  date: string;
}

interface PendingRow {
  id: string;
  title: string;
  date: string;
  type: string;
  price: string;
}

const monthlyPerformance = [
  { month: 'Sep', views: 180, contacts: 12 },
  { month: 'Oct', views: 220, contacts: 18 },
  { month: 'Nov', views: 195, contacts: 15 },
  { month: 'Dec', views: 280, contacts: 25 },
  { month: 'Jan', views: 245, contacts: 22 },
  { month: 'Fév', views: 127, contacts: 11 },
];

const propertyTypes = [
  { name: 'Villas', value: 8, color: '#DC2626' },
  { name: 'Appartements', value: 10, color: '#EF4444' },
  { name: 'Terrains', value: 4, color: '#F87171' },
  { name: 'Commerces', value: 2, color: '#FCA5A5' },
];

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
        views: 0,
        contacts: 0,
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
            <h1 className="text-3xl font-bold text-gray-800">Bonjour, {userName} 📊</h1>
            <p className="text-gray-600 mt-2">Gérez vos propriétés et suivez vos performances</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total annonces"
              value={totalListings}
              icon={Building2}
              trend={8}
              trendLabel="total annonces"
              color="from-blue-500 to-cyan-500"
              delay={0.1}
            />
            <StatsCard
              title="Annonces actives"
              value={activeListings}
              icon={CheckCircle}
              trend={5}
              trendLabel="annonces actives"
              color="from-green-500 to-emerald-500"
              delay={0.2}
            />
            <StatsCard
              title="En attente"
              value={pendingCount}
              icon={Clock}
              trend={-2}
              trendLabel="en attente"
              color="from-yellow-500 to-orange-500"
              delay={0.3}
            />
            <StatsCard
              title="Messages reçus"
              value={inquiries.length}
              icon={Eye}
              trend={15}
              trendLabel="total messages"
              color="from-purple-500 to-indigo-500"
              delay={0.4}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ChartCard title="Performances mensuelles" icon={TrendingUp} delay={0.2}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis yAxisId="left" stroke="#6B7280" />
                  <YAxis yAxisId="right" orientation="right" stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="views" fill="#DC2626" name="Vues" />
                  <Bar yAxisId="right" dataKey="contacts" fill="#FCA5A5" name="Contacts" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Répartition des annonces" icon={Building2} delay={0.3}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={propertyTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => {
                      const percentage = percent ? (percent * 100).toFixed(0) : '0';
                      return `${name} (${percentage}%)`;
                    }}
                  >
                    {propertyTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Dernières annonces</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vues</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacts</th>
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
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{listing.views}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{listing.contacts}</td>
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
