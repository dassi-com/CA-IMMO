'use client';

import { useState, useEffect } from 'react';
import {
  TrendingUp,
  Building2,
  Eye,
  MessageSquare,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { motion } from 'framer-motion';
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
import { inquiryService, Inquiry } from '@/services/inquiryService';
import { Property } from '@/types/property';
import toast from 'react-hot-toast';

export default function AgentStatsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<Property[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [myListings, myInquiries] = await Promise.all([
        propertyService.getMyListings().catch(() => []),
        inquiryService.getMyReceivedInquiries().catch(() => []),
      ]);
      setListings(myListings);
      setInquiries(myInquiries);
    } catch {
      toast.error('Erreur lors du chargement des statistiques');
    } finally {
      setLoading(false);
    }
  };

  const approved = listings.filter(l => l.status === 'APPROVED').length;
  const pending = listings.filter(l => l.status === 'PENDING').length;
  const rejected = listings.filter(l => l.status === 'REJECTED').length;

  const cityData = (() => {
    const counts: Record<string, number> = {};
    listings.forEach(l => { counts[l.city] = (counts[l.city] || 0) + 1; });
    return Object.entries(counts).slice(0, 5).map(([city, count]) => ({ city, count }));
  })();

  const statusColors: Record<string, string> = {
    APPROVED: '#10B981',
    PENDING: '#F59E0B',
    REJECTED: '#EF4444',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar role="agent" isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-24'}`}>
        <div className="p-6 lg:p-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Statistiques</h1>
            <p className="text-gray-500 mt-1">Suivez vos performances</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard title="Total annonces" value={listings.length} icon={Building2} color="from-blue-500 to-cyan-500" delay={0.1} />
            <StatsCard title="Annonces actives" value={approved} icon={CheckCircle} color="from-green-500 to-emerald-500" delay={0.2} />
            <StatsCard title="En attente" value={pending} icon={Clock} color="from-yellow-500 to-orange-500" delay={0.3} />
            <StatsCard title="Messages reçus" value={inquiries.length} icon={MessageSquare} color="from-purple-500 to-indigo-500" delay={0.4} />
          </div>

          {loading ? (
            <div className="text-center py-20 text-gray-400">Chargement...</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <ChartCard title="Annonces par statut" icon={Building2} delay={0.2}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5}
                      data={[
                        { name: 'Approuvées', value: approved, color: '#10B981' },
                        { name: 'En attente', value: pending, color: '#F59E0B' },
                        { name: 'Rejetées', value: rejected, color: '#EF4444' },
                      ]}
                      dataKey="value"
                      label={({ name, percent }) => percent ? `${name} (${(percent * 100).toFixed(0)}%)` : name}>
                      {[{ color: '#10B981' }, { color: '#F59E0B' }, { color: '#EF4444' }].map((e, i) => (
                        <Cell key={i} fill={e.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>

              {cityData.length > 0 && (
                <ChartCard title="Annonces par ville" icon={TrendingUp} delay={0.3}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={cityData.map(d => ({ ...d, color: '#DC2626' }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="city" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip />
                      <Bar dataKey="count" fill="#DC2626" radius={[8, 8, 0, 0]}>
                        {cityData.map((_, i) => <Cell key={i} fill="#DC2626" />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
