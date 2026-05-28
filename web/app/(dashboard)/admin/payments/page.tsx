'use client';

import { useState } from 'react';
import {
  DollarSign,
  Search,
  Star,
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
            <motion.div key="packages" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-12 text-center text-gray-400">
              Aucun package disponible pour le moment.
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
