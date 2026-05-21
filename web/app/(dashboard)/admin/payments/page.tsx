'use client';

import { useState } from 'react';
import {
  DollarSign,
  Search,
  CheckCircle,
  XCircle,
  Star,
  TrendingUp,
  Users,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/dashboard/Sidebar';
import toast from 'react-hot-toast';

interface AgentPayment {
  id: string;
  agentName: string;
  agentEmail: string;
  amount: number;
  package: string;
  duration: string;
  date: string;
  status: 'confirmed' | 'pending';
  reference: string;
  propertyTitle: string;
}

const MOCK_PAYMENTS: AgentPayment[] = [
  {
    id: 'pay-001',
    agentName: 'Jean Dupont',
    agentEmail: 'jean.dupont@email.com',
    amount: 50000,
    package: 'Standard',
    duration: '1 mois',
    date: '2026-05-15',
    status: 'confirmed',
    reference: 'REF-001-2026',
    propertyTitle: 'Villa moderne à Douala',
  },
  {
    id: 'pay-002',
    agentName: 'Marie Kamga',
    agentEmail: 'marie.kamga@email.com',
    amount: 120000,
    package: 'Premium',
    duration: '3 mois',
    date: '2026-05-18',
    status: 'pending',
    reference: 'REF-002-2026',
    propertyTitle: 'Appartement centre-ville Yaoundé',
  },
  {
    id: 'pay-003',
    agentName: 'Paul Biya',
    agentEmail: 'paul.biya@email.com',
    amount: 50000,
    package: 'Standard',
    duration: '1 mois',
    date: '2026-05-20',
    status: 'pending',
    reference: 'REF-003-2026',
    propertyTitle: 'Terrain à Bafoussam',
  },
];

const PACKAGES = [
  { name: 'Standard', price: '50,000 FCFA', duration: '1 mois', icon: Star, color: 'from-yellow-400 to-orange-500', desc: 'Visibilité accrue pendant 1 mois' },
  { name: 'Premium', price: '120,000 FCFA', duration: '3 mois', icon: TrendingUp, color: 'from-purple-500 to-pink-500', desc: 'Mise en avant premium + badge' },
  { name: 'VIP', price: '250,000 FCFA', duration: '6 mois', icon: ShieldCheck, color: 'from-red-600 to-red-800', desc: 'Tout inclus + support prioritaire' },
];

export default function AdminPaymentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'payments' | 'packages'>('payments');
  const [searchTerm, setSearchTerm] = useState('');
  const [payments] = useState(MOCK_PAYMENTS);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  const handleConfirm = (id: string) => {
    toast.success('Paiement confirmé. L\'annonce est maintenant en avant.');
  };

  const handleReject = (id: string) => {
    toast.success('Paiement rejeté.');
  };

  const handlePromote = (propertyTitle: string) => {
    toast.success(`Proposition envoyée pour "${propertyTitle}"`);
  };

  const filtered = payments.filter(p =>
    p.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

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
                onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
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
            <motion.div key="payments" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Agent</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Annonce</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Package</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Montant</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Statut</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginated.map((p, idx) => (
                      <motion.tr
                        key={p.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                              {p.agentName.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{p.agentName}</div>
                              <div className="text-xs text-gray-500">{p.agentEmail}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 max-w-[200px] truncate">{p.propertyTitle}</td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-purple-50 text-purple-600">
                            {p.package}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900">{p.amount.toLocaleString()} FCFA</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{p.date}</td>
                        <td className="px-6 py-4">
                          <span className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full ${
                            p.status === 'confirmed' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'confirmed' ? 'bg-green-600' : 'bg-yellow-600'}`} />
                            {p.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {p.status === 'pending' && (
                              <>
                                <button onClick={() => handleConfirm(p.id)}
                                  className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors" title="Confirmer">
                                  <CheckCircle size={18} />
                                </button>
                                <button onClick={() => handleReject(p.id)}
                                  className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors" title="Rejeter">
                                  <XCircle size={18} />
                                </button>
                              </>
                            )}
                            {p.status === 'confirmed' && (
                              <span className="text-xs text-green-600 font-medium">Déjà confirmé</span>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">Page {currentPage} sur {totalPages}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40"><ChevronLeft size={18} /></button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                      <button key={p} onClick={() => setCurrentPage(p)}
                        className={`w-9 h-9 rounded-lg text-sm font-medium ${p === currentPage ? 'bg-red-600 text-white' : 'border border-gray-200 hover:bg-gray-50'}`}>{p}</button>
                    ))}
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40"><ChevronRight size={18} /></button>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div key="packages" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {PACKAGES.map((pkg, idx) => (
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

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Agents avec annonces en avant</h3>
                <div className="space-y-3">
                  {[
                    { agent: 'Jean Dupont', listings: 3, totalPaid: 120000 },
                    { agent: 'Marie Kamga', listings: 1, totalPaid: 50000 },
                  ].map((agent, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <Star className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{agent.agent}</p>
                          <p className="text-sm text-gray-500">{agent.listings} annonce(s) en avant</p>
                        </div>
                      </div>
                      <span className="font-semibold text-gray-900">{agent.totalPaid.toLocaleString()} FCFA</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
