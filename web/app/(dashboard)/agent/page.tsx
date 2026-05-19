// web/app/dashboard/agent/page.tsx
'use client';

import { useState } from 'react';
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
import ProtectedRoute from '@/components/ProtectedRoute';
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

// Données fictives
const agentStats = {
  totalListings: 24,
  activeListings: 18,
  pendingListings: 3,
  totalViews: 1247,
};

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

const recentListings = [
  {
    id: '1',
    title: 'Villa Moderne avec Piscine',
    status: 'APPROVED',
    views: 234,
    contacts: 12,
    date: '2024-01-15',
  },
  {
    id: '2',
    title: 'Appartement de Luxe',
    status: 'PENDING',
    views: 45,
    contacts: 3,
    date: '2024-01-18',
  },
  {
    id: '3',
    title: 'Terrain Commercial',
    status: 'FEATURED',
    views: 567,
    contacts: 28,
    date: '2024-01-10',
  },
  {
    id: '4',
    title: 'Bureau Moderne',
    status: 'APPROVED',
    views: 89,
    contacts: 7,
    date: '2024-01-12',
  },
];

const pendingListings = [
  { id: 'p1', title: 'Studio Meublé', date: '2024-01-19', type: 'Appartement', price: '35,000,000 FCFA' },
  { id: 'p2', title: 'Villa 5 Chambres', date: '2024-01-18', type: 'Villa', price: '180,000,000 FCFA' },
  { id: 'p3', title: 'Terrain 1000m²', date: '2024-01-17', type: 'Terrain', price: '50,000,000 FCFA' },
];

const visitRequests = [
  {
    id: 'v1',
    tenantName: 'Marie Ngono',
    propertyTitle: 'Villa Moderne',
    date: '2024-01-20',
    time: '14:00',
    status: 'pending',
    phone: '+237 6XX XXX XXX',
  },
  {
    id: 'v2',
    tenantName: 'Paul Biya',
    propertyTitle: 'Appartement Luxe',
    date: '2024-01-21',
    time: '10:30',
    status: 'confirmed',
    phone: '+237 6XX XXX XXX',
  },
  {
    id: 'v3',
    tenantName: 'Sarah Eto\'o',
    propertyTitle: 'Terrain Commercial',
    date: '2024-01-22',
    time: '15:00',
    status: 'pending',
    phone: '+237 6XX XXX XXX',
  },
];

const topPerformers = [
  { title: 'Terrain Commercial', views: 567, contacts: 28, conversion: '4.9%' },
  { title: 'Villa Moderne', views: 234, contacts: 12, conversion: '5.1%' },
  { title: 'Appartement Luxe', views: 189, contacts: 9, conversion: '4.8%' },
];

export default function AgentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ProtectedRoute requiredRole="OWNER">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Sidebar role="agent" isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

        <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-24'}`}>
        <div className="p-6 lg:p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-800">Bonjour, Marie Claire 📊</h1>
            <p className="text-gray-600 mt-2">Gérez vos propriétés et suivez vos performances</p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total annonces"
              value={agentStats.totalListings}
              icon={Building2}
              trend={8}
              trendLabel="vs mois dernier"
              color="from-blue-500 to-cyan-500"
              delay={0.1}
            />
            <StatsCard
              title="Annonces actives"
              value={agentStats.activeListings}
              icon={CheckCircle}
              trend={5}
              trendLabel="vs mois dernier"
              color="from-green-500 to-emerald-500"
              delay={0.2}
            />
            <StatsCard
              title="En attente"
              value={agentStats.pendingListings}
              icon={Clock}
              trend={-2}
              trendLabel="vs mois dernier"
              color="from-yellow-500 to-orange-500"
              delay={0.3}
            />
            <StatsCard
              title="Vues totales"
              value={agentStats.totalViews}
              icon={Eye}
              trend={15}
              trendLabel="vs mois dernier"
              color="from-purple-500 to-indigo-500"
              delay={0.4}
            />
          </div>

          {/* Charts Row */}
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

          {/* Recent Listings Table */}
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Titre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vues
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contacts
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentListings.map((listing) => (
                    <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{listing.title}</div>
                        <div className="text-sm text-gray-500">{listing.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            listing.status === 'APPROVED'
                              ? 'bg-green-100 text-green-600'
                              : listing.status === 'PENDING'
                              ? 'bg-yellow-100 text-yellow-600'
                              : 'bg-purple-100 text-purple-600'
                          }`}
                        >
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
                          <button className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors">
                            <Trash2 size={18} />
                          </button>
                          <button className="p-1 text-yellow-600 hover:bg-yellow-50 rounded transition-colors">
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

          {/* Pending Listings and Visit Requests Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Pending Listings */}
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
                {pendingListings.map((listing) => (
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
                      <button className="text-xs text-red-600 font-medium">Modifier</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Visit Requests */}
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
                {visitRequests.map((request) => (
                  <div key={request.id} className="p-3 bg-blue-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-800">{request.tenantName}</h4>
                        <p className="text-sm text-gray-600">{request.propertyTitle}</p>
                      </div>
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          request.status === 'confirmed'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-yellow-100 text-yellow-600'
                        }`}
                      >
                        {request.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>
                          {request.date} à {request.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare size={12} />
                        <span>{request.phone}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
                        Confirmer
                      </button>
                      <button className="flex-1 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors">
                        Refuser
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Featured Promotion and Top Performers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Featured Promotion */}
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
              <button className="w-full py-3 bg-white text-red-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                <DollarSign size={20} />
                Passer une annonce en vedette
              </button>
            </motion.div>

            {/* Top Performers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Top performances par propriété</h3>
              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-800">{performer.title}</h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <span>👁️ {performer.views} vues</span>
                        <span>💬 {performer.contacts} contacts</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{performer.conversion}</div>
                      <div className="text-xs text-gray-500">taux conversion</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
    </ProtectedRoute>
  );
}