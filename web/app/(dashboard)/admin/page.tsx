'use client';

import { useState, useEffect } from 'react';
import {
  Building2,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  DollarSign,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Sidebar from '@/components/dashboard/Sidebar';
import { adminService } from '@/services/adminService';
import { Property } from '@/types/property';
import { User } from '@/services/authService';

export default function AdminDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [allUsers, allProperties] = await Promise.all([
          adminService.getAllUsers(),
          adminService.getAllProperties(),
        ]);
        setUsers(allUsers);
        setProperties(allProperties);
      } catch {
        console.error('Erreur chargement admin');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const pendingCount = properties.filter(p => p.status === 'PENDING').length;
  const approvedCount = properties.filter(p => p.status === 'APPROVED').length;
  const rejectedCount = properties.filter(p => p.status === 'REJECTED').length;
  const featuredCount = properties.filter(p => p.is_featured).length;
  const agentCount = users.filter(u => u.role === 'OWNER').length;
  const tenantCount = users.filter(u => u.role === 'TENANT').length;

  const stats = [
    { label: 'Annonces totales', value: properties.length, icon: Building2, color: 'from-blue-500 to-blue-600', link: '/admin/listings' },
    { label: 'En attente', value: pendingCount, icon: Clock, color: 'from-yellow-500 to-yellow-600', link: '/admin/listings' },
    { label: 'Approuvees', value: approvedCount, icon: CheckCircle, color: 'from-green-500 to-green-600', link: '/admin/listings' },
    { label: 'Rejetees', value: rejectedCount, icon: XCircle, color: 'from-red-500 to-red-600', link: '/admin/listings' },
    { label: 'En avant', value: featuredCount, icon: TrendingUp, color: 'from-purple-500 to-purple-600', link: '/admin/listings' },
    { label: 'Agents', value: agentCount, icon: Users, color: 'from-indigo-500 to-indigo-600', link: '/admin/users' },
    { label: 'Locataires', value: tenantCount, icon: DollarSign, color: 'from-teal-500 to-teal-600', link: '/admin/users' },
  ];

  const recentProperties = properties.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar role="admin" isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-24'}`}>
        <div className="p-6 lg:p-8">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
            <p className="text-gray-500 mt-1">Vue d'ensemble de la plateforme</p>
          </motion.div>

          {loading ? (
            <div className="text-center py-20 text-gray-400">Chargement...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => (
                  <Link key={stat.label} href={stat.link}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white`}>
                          <stat.icon size={24} />
                        </div>
                        <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                      </div>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </motion.div>
                  </Link>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Annonces recentes</h2>
                  {recentProperties.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">Aucune annonce</p>
                  ) : (
                    <div className="space-y-3">
                      {recentProperties.map((p, idx) => (
                        <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">{p.title}</p>
                            <p className="text-sm text-gray-500 truncate">{p.city} - {p.price.toLocaleString()} {p.currency}</p>
                          </div>
                          <span className={`ml-3 px-2.5 py-1 text-xs font-semibold rounded-full ${
                            p.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                            p.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {p.status === 'APPROVED' ? 'Approuvee' : p.status === 'PENDING' ? 'En attente' : 'Rejetee'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Actions rapides</h2>
                  <div className="space-y-3">
                    <Link href="/admin/listings" className="block p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
                      <p className="font-medium text-blue-700">Gerer les annonces</p>
                      <p className="text-sm text-blue-500">{pendingCount} en attente d'approbation</p>
                    </Link>
                    <Link href="/admin/users" className="block p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors">
                      <p className="font-medium text-purple-700">Gerer les utilisateurs</p>
                      <p className="text-sm text-purple-500">{users.length} utilisateurs inscrits</p>
                    </Link>
                    <Link href="/admin/payments" className="block p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors">
                      <p className="font-medium text-green-700">Mises en avant</p>
                      <p className="text-sm text-green-500">{featuredCount} annonces en avant</p>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
