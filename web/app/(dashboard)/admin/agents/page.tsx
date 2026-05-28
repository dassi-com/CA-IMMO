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
  Clock,
  CheckCircle,
  XCircle,
  FileText,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/dashboard/Sidebar';
import { SkeletonCards } from '@/components/ui/Skeleton';
import { adminService } from '@/services/adminService';
import { User } from '@/services/authService';
import { featureRequestService, FeatureRequestResponse } from '@/services/featureRequestService';
import toast from 'react-hot-toast';

export default function AdminAgentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tab, setTab] = useState<'agents' | 'requests'>('agents');

  // Agents state
  const [agents, setAgents] = useState<User[]>([]);
  const [loadingAgents, setLoadingAgents] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  // Feature requests state
  const [requests, setRequests] = useState<FeatureRequestResponse[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [rejectModal, setRejectModal] = useState<{ open: boolean; requestId: string }>({ open: false, requestId: '' });
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => { loadAgents(); loadRequests(); }, []);

  const loadAgents = async () => {
    setLoadingAgents(true);
    try {
      const data = await adminService.getAgents();
      setAgents(data);
    } catch {
      toast.error('Erreur lors du chargement des agents');
    } finally {
      setLoadingAgents(false);
    }
  };

  const loadRequests = async () => {
    setLoadingRequests(true);
    try {
      const { requests } = await featureRequestService.getPending('AGENT');
      setRequests(requests);
    } catch {
      toast.error('Erreur lors du chargement des demandes');
    } finally {
      setLoadingRequests(false);
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

  const handleApprove = async (requestId: string) => {
    try {
      await featureRequestService.approve(requestId);
      toast.success('Demande approuvée avec succès');
      loadRequests();
      loadAgents();
    } catch {
      toast.error('Erreur lors de l\'approbation');
    }
  };

  const handleReject = async () => {
    if (!rejectModal.requestId) return;
    try {
      await featureRequestService.reject(rejectModal.requestId, rejectReason || undefined);
      toast.success('Demande rejetée');
      setRejectModal({ open: false, requestId: '' });
      setRejectReason('');
      loadRequests();
    } catch {
      toast.error('Erreur lors du rejet');
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
              <p className="text-gray-500 mt-1">Gérez les agents et les demandes de mise en avant</p>
            </div>
            {tab === 'agents' && (
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
            )}
          </motion.div>

          {/* Tabs */}
          <div className="flex items-center gap-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setTab('agents')}
              className={`pb-3 px-1 text-sm font-medium transition-colors relative ${tab === 'agents' ? 'text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Users size={16} className="inline mr-1.5" />
              Tous les agents
              {tab === 'agents' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />}
            </button>
            <button
              onClick={() => setTab('requests')}
              className={`pb-3 px-1 text-sm font-medium transition-colors relative ${tab === 'requests' ? 'text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Clock size={16} className="inline mr-1.5" />
              Demandes en attente
              {requests.length > 0 && (
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
                  {requests.length}
                </span>
              )}
              {tab === 'requests' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {tab === 'agents' ? (
              <motion.div key="agents" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {loadingAgents ? (
                  <SkeletonCards count={6} />
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
                        className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${agent.is_featured ? 'ring-2 ring-yellow-400' : ''}`}
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
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${agent.is_featured ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>
                              {agent.is_featured ? 'En avant' : 'Standard'}
                            </span>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${!agent.is_suspended ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
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
              </motion.div>
            ) : (
              <motion.div key="requests" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {loadingRequests ? (
                  <SkeletonCards count={4} />
                ) : requests.length === 0 ? (
                  <div className="text-center py-20 text-gray-400">Aucune demande en attente</div>
                ) : (
                  <div className="space-y-4">
                    {requests.map((req) => (
                      <motion.div
                        key={req.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-lg p-6"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                {(req.agent?.full_name || '?').charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-900">{req.agent?.full_name || 'Agent inconnu'}</h3>
                                <p className="text-sm text-gray-500">{req.agent?.email}</p>
                              </div>
                            </div>
                            {req.reason && (
                              <p className="text-sm text-gray-600 mt-2 flex items-start gap-2">
                                <FileText size={14} className="mt-0.5 text-gray-400 flex-shrink-0" />
                                {req.reason}
                              </p>
                            )}
                            <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                              <span>Demandé par {req.requester?.full_name || 'inconnu'}</span>
                              <span>{new Date(req.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                              onClick={() => handleApprove(req.id)}
                              className="flex items-center gap-1.5 px-4 py-2 bg-green-50 text-green-700 rounded-xl text-sm font-medium hover:bg-green-100 transition-colors"
                            >
                              <CheckCircle size={16} />
                              Approuver
                            </button>
                            <button
                              onClick={() => setRejectModal({ open: true, requestId: req.id })}
                              className="flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
                            >
                              <XCircle size={16} />
                              Rejeter
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Reject Modal */}
      <AnimatePresence>
        {rejectModal.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setRejectModal({ open: false, requestId: '' })}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-lg font-bold text-gray-800 mb-2">Rejeter la demande</h2>
              <p className="text-sm text-gray-500 mb-4">Indiquez la raison du rejet (optionnel)</p>
              <textarea
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                placeholder="Raison du rejet..."
                rows={3}
                className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              />
              <div className="flex items-center justify-end gap-3 mt-4">
                <button
                  onClick={() => { setRejectModal({ open: false, requestId: '' }); setRejectReason(''); }}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleReject}
                  className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Rejeter
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
