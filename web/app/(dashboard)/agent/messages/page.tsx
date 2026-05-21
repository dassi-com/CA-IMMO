'use client';

import { useState, useEffect } from 'react';
import {
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  Home,
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/dashboard/Sidebar';
import { inquiryService, Inquiry } from '@/services/inquiryService';
import toast from 'react-hot-toast';

export default function AgentMessagesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  useEffect(() => { loadMessages(); }, []);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const data = await inquiryService.getMyReceivedInquiries();
      setInquiries(data);
    } catch {
      toast.error('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const filtered = inquiries.filter(i =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (i.message || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (i.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar role="agent" isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-24'}`}>
        <div className="p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Messages</h1>
              <p className="text-gray-500 mt-1">{inquiries.length} message(s) reçu(s)</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Rechercher..." value={searchTerm}
                onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 w-64" />
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-gray-400">Chargement...</div>
            ) : paginated.length === 0 ? (
              <div className="p-12 text-center text-gray-400">Aucun message</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {paginated.map((inq, idx) => (
                  <motion.div key={inq.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.03 }}
                    className="p-5 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
                          {inq.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{inq.name}</p>
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1"><Mail size={14} />{inq.email}</span>
                            {inq.phone_number && <span className="flex items-center gap-1"><Phone size={14} />{inq.phone_number}</span>}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(inq.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {inq.message && (
                      <p className="text-gray-600 text-sm ml-13 pl-13 mt-2">{inq.message}</p>
                    )}
                    {inq.property && (
                      <div className="flex items-center gap-2 mt-3 text-sm text-blue-600">
                        <Home size={14} />
                        <span>Demande pour : {inq.property.title}</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}

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
        </div>
      </main>
    </div>
  );
}
