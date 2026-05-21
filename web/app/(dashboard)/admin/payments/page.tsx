'use client';

import { useState } from 'react';
import {
  DollarSign,
  Search,
  Star,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/dashboard/Sidebar';
import toast from 'react-hot-toast';

export default function AdminPaymentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'payments' | 'packages'>('payments');
  const [searchTerm, setSearchTerm] = useState('');

  const handlePromote = (propertyTitle: string) => {
    toast.success(`Proposition envoyée pour "${propertyTitle}"`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar role="admin" isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-24'}`}>
        <div className="p-6 lg:p-8">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Paiements & Mises en avant</h1>
              <p className="text-gray-500 mt-1">Gérez les abonnements et promotions des agents</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={e => { setSearchTerm(e.target.value); }}
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 w-64"
              />
            </div>
          </motion.div>

          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'payments'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <DollarSign size={16} />
                Paiements reçus
              </div>
            </button>
            <button
              onClick={() => setActiveTab('packages')}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'packages'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <Star size={16} />
                Packages promotionnels
              </div>
            </button>
          </div>

          {activeTab === 'payments' ? (
            <motion.div key="payments" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-12 text-center text-gray-400">
              Aucun paiement pour le moment.
            </motion.div>
          ) : (
            <motion.div key="packages" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { name: 'Standard', price: '50,000 FCFA', duration: '1 mois', icon: Star, color: 'from-yellow-400 to-orange-500', desc: 'Visibilité accrue pendant 1 mois' },
                  { name: 'Premium', price: '120,000 FCFA', duration: '3 mois', icon: TrendingUp, color: 'from-purple-500 to-pink-500', desc: 'Mise en avant premium + badge' },
                  { name: 'VIP', price: '250,000 FCFA', duration: '6 mois', icon: ShieldCheck, color: 'from-red-600 to-red-800', desc: 'Tout inclus + support prioritaire' },
                ].map((pkg, idx) => (
                  <motion.div
                    key={pkg.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden"
                  >
                    <div className={`bg-gradient-to-r ${pkg.color} p-6 text-white text-center`}>
                      <pkg.icon className="mx-auto mb-3" size={40} />
                      <h3 className="text-xl font-bold">{pkg.name}</h3>
                    </div>
                    <div className="p-6">
                      <div className="text-center mb-4">
                        <span className="text-3xl font-bold text-gray-900">{pkg.price}</span>
                        <p className="text-sm text-gray-500 mt-1">pour {pkg.duration}</p>
                      </div>
                      <p className="text-sm text-gray-600 text-center mb-6">{pkg.desc}</p>
                      <button
                        onClick={() => handlePromote(pkg.name)}
                        className="w-full py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
                      >
                        Proposer à un agent
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
