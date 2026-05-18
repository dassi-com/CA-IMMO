'use client';

import { useState } from 'react';
import {
  Heart,
  Calendar,
  MessageSquare,
  Bell,
  TrendingUp,
  Home,
  MapPin,
  Eye,
  Star,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/dashboard/Sidebar';
import StatsCard from '@/components/dashboard/StatsCard';
import ChartCard, {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from '@/components/dashboard/ChartCard';

// Données fictives
const tenantStats = {
  favoritesCount: 6,
  upcomingVisits: 3,
  messagesSent: 12,
  activeAlerts: 2,
};

const favoritesActivity = [
  { month: 'Sep', favorites: 4 },
  { month: 'Oct', favorites: 7 },
  { month: 'Nov', favorites: 5 },
  { month: 'Dec', favorites: 9 },
  { month: 'Jan', favorites: 6 },
  { month: 'Fév', favorites: 8 },
];

const budgetData = [
  { name: 'Achat (50-100M)', value: 35, color: '#DC2626' },
  { name: 'Achat (100-200M)', value: 25, color: '#EF4444' },
  { name: 'Location (<500k)', value: 20, color: '#F87171' },
  { name: 'Location (500k-1M)', value: 20, color: '#FCA5A5' },
];

const upcomingVisits = [
  {
    id: '1',
    propertyTitle: 'Villa Moderne avec Piscine',
    location: 'Bastos, Yaoundé',
    date: '2024-01-20',
    time: '14:00',
    agentName: 'Marie Claire',
    status: 'confirmed',
    image: '/images/property1.jpg',
  },
  {
    id: '2',
    propertyTitle: 'Appartement de Luxe Douala',
    location: 'Bonapriso, Douala',
    date: '2024-01-22',
    time: '10:30',
    agentName: 'Jean Paul',
    status: 'pending',
    image: '/images/property2.jpg',
  },
  {
    id: '3',
    propertyTitle: 'Studio Meublé',
    location: 'Mvog-Mbi, Yaoundé',
    date: '2024-01-25',
    time: '15:00',
    agentName: 'Sophie Laure',
    status: 'confirmed',
    image: '/images/property3.jpg',
  },
];

const favoriteProperties = [
  {
    id: '1',
    title: 'Villa de Standing à Bastos',
    price: '250,000,000 FCFA',
    location: 'Bastos, Yaoundé',
    image: '/images/fav1.jpg',
    type: 'Villa',
  },
  {
    id: '2',
    title: 'Appartement Vue Mer',
    price: '95,000,000 FCFA',
    location: 'Akwa, Douala',
    image: '/images/fav2.jpg',
    type: 'Appartement',
  },
  {
    id: '3',
    title: 'Terrain Constructible',
    price: '45,000,000 FCFA',
    location: 'Odza, Yaoundé',
    image: '/images/fav3.jpg',
    type: 'Terrain',
  },
  {
    id: '4',
    title: 'Bureau Commercial',
    price: '1,200,000 FCFA/mois',
    location: 'Etoa-Meki, Yaoundé',
    image: '/images/fav4.jpg',
    type: 'Bureau',
  },
];

const recommendations = [
  {
    id: 'rec1',
    title: 'Prestigious Villa with Pool',
    price: '285,000,000 FCFA',
    location: 'Bastos, Yaoundé',
    image: '/images/rec1.jpg',
    matchReason: 'Similar to "Villa Moderne"',
    matchScore: 95,
  },
  {
    id: 'rec2',
    title: 'Modern Apartment - Bonapriso',
    price: '89,000,000 FCFA',
    location: 'Bonapriso, Douala',
    image: '/images/rec2.jpg',
    matchReason: 'Based on your favorite area',
    matchScore: 88,
  },
  {
    id: 'rec3',
    title: 'Luxury Penthouse',
    price: '1,500,000 FCFA/mois',
    location: 'Hippodrome, Yaoundé',
    image: '/images/rec3.jpg',
    matchReason: 'Matches your budget criteria',
    matchScore: 82,
  },
];

const activeAlerts = [
  {
    id: 'alert1',
    type: 'price',
    criteria: 'Prix inférieur à 100,000,000 FCFA',
    description: 'Alerte pour maisons à Yaoundé',
    active: true,
  },
  {
    id: 'alert2',
    type: 'area',
    criteria: 'Nouveaux biens à Douala',
    description: 'Quartiers: Bonapriso, Akwa, Bali',
    active: true,
  },
];

export default function TenantDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar role="tenant" isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-24'}`}>
        <div className="p-6 lg:p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-800">Bonjour, Jean 👋</h1>
            <p className="text-gray-600 mt-2">Voici votre activité récente sur CentralAfricaHomes</p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Propriétés favorites"
              value={tenantStats.favoritesCount}
              icon={Heart}
              trend={12}
              trendLabel="vs mois dernier"
              color="from-pink-500 to-rose-500"
              delay={0.1}
            />
            <StatsCard
              title="Visites programmées"
              value={tenantStats.upcomingVisits}
              icon={Calendar}
              trend={-5}
              trendLabel="vs mois dernier"
              color="from-blue-500 to-cyan-500"
              delay={0.2}
            />
            <StatsCard
              title="Messages envoyés"
              value={tenantStats.messagesSent}
              icon={MessageSquare}
              trend={8}
              trendLabel="vs mois dernier"
              color="from-green-500 to-emerald-500"
              delay={0.3}
            />
            <StatsCard
              title="Alertes actives"
              value={tenantStats.activeAlerts}
              icon={Bell}
              color="from-purple-500 to-indigo-500"
              delay={0.4}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ChartCard title="Activité des favoris" icon={TrendingUp} delay={0.2}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={favoritesActivity}>
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
                  <Line
                    type="monotone"
                    dataKey="favorites"
                    stroke="#DC2626"
                    strokeWidth={2}
                    dot={{ fill: '#DC2626', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>


<ChartCard title="Budget par catégorie" icon={Home} delay={0.3}>
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={budgetData}
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
        {budgetData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
</ChartCard>
          </div>

          {/* Favorite Properties */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Propriétés favorites récentes</h2>
              <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                Voir tout →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {favoriteProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="relative h-48 bg-gradient-to-br from-red-400 to-red-600">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                      <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                        <Heart className="w-4 h-4 text-red-600 fill-red-600" />
                      </button>
                      <div className="absolute bottom-3 left-3 bg-red-600 text-white px-2 py-1 rounded-lg text-xs">
                        {property.type}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-1">{property.title}</h3>
                      <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                        <MapPin size={14} />
                        <span>{property.location}</span>
                      </div>
                      <p className="text-red-600 font-bold">{property.price}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visits and Alerts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Upcoming Visits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Visites à venir</h3>
              <div className="space-y-4">
                {upcomingVisits.map((visit, index) => (
                  <motion.div
                    key={visit.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{visit.propertyTitle}</h4>
                        <p className="text-sm text-gray-500">{visit.location}</p>
                        <p className="text-xs text-gray-400">
                          {visit.date} à {visit.time} • {visit.agentName}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        visit.status === 'confirmed'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-yellow-100 text-yellow-600'
                      }`}
                    >
                      {visit.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Active Alerts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Alertes actives</h3>
              <div className="space-y-3">
                {activeAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-red-600" />
                        <span className="font-medium text-gray-800">{alert.criteria}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-xs text-green-600">Active</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{alert.description}</p>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                + Créer une alerte
              </button>
            </motion.div>
          </div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recommandations personnalisées</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="relative group cursor-pointer"
                >
                  <div className="absolute -top-2 -right-2 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full p-2 shadow-lg">
                      <Star className="w-4 h-4 text-white fill-white" />
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="h-48 bg-gradient-to-br from-red-400 to-red-600 relative">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                      <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded-lg text-xs">
                        {rec.matchScore}% match
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-1">{rec.title}</h3>
                      <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                        <MapPin size={14} />
                        <span>{rec.location}</span>
                      </div>
                      <p className="text-red-600 font-bold mb-2">{rec.price}</p>
                      <p className="text-xs text-gray-400">{rec.matchReason}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}