// web/app/dashboard/admin/page.tsx - Version corrigée :

'use client';

import { useState } from 'react';
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
import ProtectedRoute from '@/components/ProtectedRoute';
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

// Données fictives
const adminStats = {
  totalUsers: 145,
  totalListings: 342,
  pendingListings: 12,
  totalRevenue: 1250000,
};

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

const pendingListings = [
  {
    id: 'p1',
    title: 'Beachfront Villa',
    agentName: 'Marie Claire',
    agentEmail: 'marie@email.com',
    date: '2024-01-18',
    price: '250,000,000 FCFA',
    type: 'Villa',
  },
  {
    id: 'p2',
    title: 'City Center Office',
    agentName: 'Jean Paul',
    agentEmail: 'jean@email.com',
    date: '2024-01-17',
    price: '1,200,000 FCFA/mois',
    type: 'Commercial',
  },
  {
    id: 'p3',
    title: 'Luxury Apartment',
    agentName: 'Sophie Laure',
    agentEmail: 'sophie@email.com',
    date: '2024-01-16',
    price: '95,000,000 FCFA',
    type: 'Appartement',
  },
  {
    id: 'p4',
    title: 'Modern Studio',
    agentName: 'Paul Biya',
    agentEmail: 'paul@email.com',
    date: '2024-01-15',
    price: '35,000,000 FCFA',
    type: 'Studio',
  },
];

const recentUsers = [
  {
    id: 'u1',
    name: 'Jean Mbarga',
    email: 'jean.mbarga@email.com',
    role: 'tenant',
    date: '2024-01-15',
    status: 'active',
  },
  {
    id: 'u2',
    name: 'Claire Ngo',
    email: 'claire.ngo@email.com',
    role: 'agent',
    date: '2024-01-14',
    status: 'active',
  },
  {
    id: 'u3',
    name: 'Paul Eto\'o',
    email: 'paul.eto@email.com',
    role: 'tenant',
    date: '2024-01-13',
    status: 'suspended',
  },
  {
    id: 'u4',
    name: 'Sarah Moukoko',
    email: 'sarah@email.com',
    role: 'agent',
    date: '2024-01-12',
    status: 'active',
  },
];

const paymentRequests = [
  {
    id: 'pay1',
    agentName: 'Marie Claire',
    amount: 50000,
    package: '1 mois Featured',
    date: '2024-01-19',
    status: 'pending',
    reference: 'FLW-123456',
  },
  {
    id: 'pay2',
    agentName: 'Jean Paul',
    amount: 120000,
    package: '3 mois Featured',
    date: '2024-01-18',
    status: 'confirmed',
    reference: 'FLW-123457',
  },
];

const systemAlerts = [
  {
    id: 'a1',
    type: 'warning',
    message: 'Plus de 10 annonces en attente depuis plus de 48h',
    date: '2024-01-19',
    priority: 'high',
  },
  {
    id: 'a2',
    type: 'info',
    message: "L'agent Marie Claire a publié 5 annonces cette semaine",
    date: '2024-01-18',
    priority: 'medium',
  },
  {
    id: 'a3',
    type: 'success',
    message: 'Nouveau record de visites ce mois-ci',
    date: '2024-01-17',
    priority: 'low',
  },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = recentUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProtectedRoute requiredRole="ADMIN">
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
              value={adminStats.totalUsers}
              icon={Users}
              trend={12}
              trendLabel="vs mois dernier"
              color="from-blue-500 to-cyan-500"
              delay={0.1}
            />
            <StatsCard
              title="Annonces totales"
              value={adminStats.totalListings}
              icon={Building2}
              trend={8}
              trendLabel="vs mois dernier"
              color="from-green-500 to-emerald-500"
              delay={0.2}
            />
            <StatsCard
              title="En attente"
              value={adminStats.pendingListings}
              icon={Clock}
              trend={-3}
              trendLabel="vs mois dernier"
              color="from-yellow-500 to-orange-500"
              delay={0.3}
            />
            <StatsCard
              title="Revenus"
              value={`${(adminStats.totalRevenue / 1000000).toFixed(1)}M FCFA`}
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
                          <button className="p-1.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                            <CheckCircle size={18} />
                          </button>
                          <button className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                            <XCircle size={18} />
                          </button>
                          <button className="p-1.5 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors">
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
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              user.role === 'admin'
                                ? 'bg-purple-100 text-purple-600'
                                : user.role === 'agent'
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
                              user.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                              <Shield size={18} />
                            </button>
                            <button className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors">
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
    </ProtectedRoute>
  );
}