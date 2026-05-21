'use client';

import { useState } from 'react';
import { Bell, Plus, Trash2, Search, MapPin, Home, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/dashboard/Sidebar';
import toast from 'react-hot-toast';

export default function TenantAlertsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [alerts, setAlerts] = useState<any[]>([]);

  const handleDelete = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
    toast.success('Alerte supprimée');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar role="tenant" isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-24'}`}>
        <div className="p-4 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Mes alertes</h1>
              <p className="text-gray-500 mt-1">Soyez notifié des nouvelles annonces correspondant à vos critères</p>
            </div>
            <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors">
              <Plus size={18} />
              Nouvelle alerte
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Alertes actives', value: alerts.length, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Notifications cette semaine', value: 0, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Nouvelles annonces', value: 0, color: 'text-red-600', bg: 'bg-red-50' },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className={`${stat.bg} rounded-2xl p-5 text-center`}>
                <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {alerts.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <Bell size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Aucune alerte configurée</h3>
              <p className="text-gray-500 mb-6">
                Créez une alerte pour recevoir des notifications dès qu'une annonce correspond à vos critères.
              </p>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors">
                <Plus size={18} />
                Créer une alerte
              </button>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="divide-y divide-gray-100">
                {alerts.map((alert) => (
                  <div key={alert.id} className="p-4 lg:p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                        <Bell size={18} className="text-red-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate">{alert.criteria}</p>
                        <p className="text-sm text-gray-500 truncate">{alert.description}</p>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(alert.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
