'use client';

import { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Star,
  Shield,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/dashboard/Sidebar';
import { adminService } from '@/services/adminService';
import { User } from '@/services/authService';
import toast from 'react-hot-toast';

export default function AdminAgentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [agents, setAgents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  useEffect(() => { loadAgents(); }, []);

  const loadAgents = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAgents();
      setAgents(data);
    } catch {
      toast.error('Erreur lors du chargement des agents');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFeatured = async (userId: string) => {
    try {
      const updated = await adminService.toggleFeaturedAgent(userId);
      setAgents(prev => prev.map(a => a.id === updated.id ? updated : a));
      toast.success(updated.is_featured ? 'Agent mis en avant' : 'Agent retiré des avant');
    } catch {
      toast.error('Erreur lors de la modification');
    }
  };

  const filtered = agents.filter(
    a => a.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
         (a.phone || '').includes(searchTerm)
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar role="admin" isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-24'}`}>
        <div className="p-6 lg:p-8">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Agents immobiliers</h1>
              <p className="text-gray-500 mt-1">Mettez en avant les agents les plus fiables</p>
            </div>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Rechercher un agent..."
                value={searchTerm}
                onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full sm:w-72 pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </motion.div>

          {loading ? (
            <div className="text-center py-20 text-gray-400">Chargement...</div>
          ) : paginated.length === 0 ? (
            <div className="text-center py-20 text-gray-400">Aucun agent trouvé</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginated.map((agent, idx) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
                    agent.is_featured ? 'ring-2 ring-yellow-400' : ''
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        {agent.avatar_url ? (
                          <img src={agent.avatar_url} alt={agent.full_name} className="w-16 h-16 rounded-full object-cover" />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xl">
                            {agent.full_name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        {agent.is_featured && (
                          <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1">
                            <Star size={12} className="text-white fill-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 truncate">{agent.full_name}</h3>
                        <p className="text-sm text-gray-500 truncate">{agent.email}</p>
                        {agent.phone && <p className="text-xs text-gray-400">{agent.phone}</p>}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        agent.is_featured
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {agent.is_featured ? 'En avant' : 'Standard'}
                      </span>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        !agent.is_suspended ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {agent.is_suspended ? 'Suspendu' : 'Actif'}
                      </span>
                    </div>

                    <button
                      onClick={() => handleToggleFeatured(agent.id)}
                      disabled={agent.is_suspended}
                      className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        agent.is_featured
                          ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                      } ${agent.is_suspended ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <Star size={16} className={agent.is_featured ? 'text-gray-400' : 'text-yellow-500'} />
                      {agent.is_featured ? 'Retirer des avant' : 'Mettre en avant'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8 bg-white rounded-xl px-6 py-4 shadow-sm">
              <span className="text-sm text-gray-500">Page {currentPage} sur {totalPages}</span>
              <div className="flex items-center gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40">
                  <ChevronLeft size={18} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setCurrentPage(p)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium ${p === currentPage ? 'bg-red-600 text-white' : 'border border-gray-200 hover:bg-gray-50'}`}>{p}</button>
                ))}
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
