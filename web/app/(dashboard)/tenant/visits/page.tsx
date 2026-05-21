'use client';

import { useState } from 'react';
import { Calendar, MapPin, Clock, Eye, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/dashboard/Sidebar';
import Link from 'next/link';

export default function TenantVisitsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar role="tenant" isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-24'}`}>
        <div className="p-4 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Mes visites</h1>
              <p className="text-gray-500 mt-1">Planifiez et suivez vos visites de propriétés</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'À venir', value: 0, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Passées', value: 0, color: 'text-gray-600', bg: 'bg-gray-50' },
              { label: 'Annulées', value: 0, color: 'text-red-600', bg: 'bg-red-50' },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className={`${stat.bg} rounded-2xl p-5 text-center`}>
                <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Aucune visite programmée</h3>
            <p className="text-gray-500 mb-6">
              Contactez un agent depuis une annonce pour planifier une visite.
            </p>
            <Link href="/search" className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors">
              <Eye size={18} />
              Parcourir les annonces
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
