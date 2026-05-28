'use client';

import { useState, useEffect } from 'react';
import {
  Heart,
  Calendar,
  MessageSquare,
  Bell,
  MapPin,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Sidebar from '@/components/dashboard/Sidebar';
import StatsCard from '@/components/dashboard/StatsCard';
import { SkeletonCard } from '@/components/ui/Skeleton';
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
              title="Propriétés favorites"
              value={favoritesCount}
              icon={Heart}
              color="from-red-500 to-pink-500"
              delay={0.1}
            />
            <StatsCard
              title="Visites à venir"
              value={0}
              icon={Calendar}
              color="from-blue-500 to-cyan-500"
              delay={0.2}
            />
            <StatsCard
              title="Messages envoyés"
              value={0}
              icon={MessageSquare}
              color="from-green-500 to-emerald-500"
              delay={0.3}
            />
            <StatsCard
              title="Alertes"
              value={0}
              icon={Bell}
              color="from-yellow-500 to-orange-500"
              delay={0.4}
            />
          </div>
          )}



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
            {loading ? (
              <SkeletonCard count={4} />
            ) : (
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
            )}
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