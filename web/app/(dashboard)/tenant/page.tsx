'use client';

import { useState, useEffect } from 'react';
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
import Link from 'next/link';
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
import { favoriteService } from '@/services/favoriteService';
import { Property } from '@/types/property';

interface FavoriteItem {
  id: string;
  title: string;
  price: string;
  location: string;
  image: string;
  type: string;
}

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
  const [loading, setLoading] = useState(true);
  const [favoriteProperties, setFavoriteProperties] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const data = await favoriteService.getFavorites();
      setFavoriteProperties(data.map((p: Property) => ({
        id: p.id,
        title: p.title,
        price: `${p.price.toLocaleString()} ${p.currency}`,
        location: `${p.neighborhood}, ${p.city}`,
        image: p.images?.[0]?.image_url || '/placeholder.jpg',
        type: p.property_type,
      })));
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const favoritesCount = favoriteProperties.length;

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
            <h1 className="text-3xl font-bold text-gray-800">Tableau de bord</h1>
            <p className="text-gray-600 mt-2">Voici votre activité récente</p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Propriétés favorites"
              value={favoritesCount}
              icon={Heart}
              trend={12}
              trendLabel="total favoris"
              color="from-red-500 to-pink-500"
              delay={0.1}
            />
            <StatsCard
              title="Visites à venir"
              value={0}
              icon={Calendar}
              trend={0}
              trendLabel="cette semaine"
              color="from-blue-500 to-cyan-500"
              delay={0.2}
            />
            <StatsCard
              title="Messages envoyés"
              value={0}
              icon={MessageSquare}
              trend={8}
              trendLabel="aucun message"
              color="from-green-500 to-emerald-500"
              delay={0.3}
            />
            <StatsCard
              title="Alertes actives"
              value={activeAlerts.length}
              icon={Bell}
              trend={1}
              trendLabel="alertes"
              color="from-yellow-500 to-orange-500"
              delay={0.4}
            />
            <StatsCard
              title="Visites programmées"
              value={0}
              icon={Calendar}
              trend={-5}
              trendLabel="vs mois dernier"
              color="from-blue-500 to-cyan-500"
              delay={0.2}
            />
            <StatsCard
              title="Messages envoyés"
              value={0}
              icon={MessageSquare}
              trend={8}
              trendLabel="vs mois dernier"
              color="from-green-500 to-emerald-500"
              delay={0.3}
            />
            <StatsCard
              title="Alertes actives"
              value={activeAlerts.length}
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
                <p className="text-gray-500 text-sm text-center py-8">
                  Aucune visite prévue. Parcourez les annonces pour planifier des visites.
                </p>
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
            <div className="text-center py-8 bg-white rounded-2xl shadow-lg">
              <p className="text-gray-500">
                Ajoutez des propriétés à vos favoris pour recevoir des recommandations personnalisées.
              </p>
              <Link href="/search" className="mt-4 inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
                Parcourir les annonces
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}