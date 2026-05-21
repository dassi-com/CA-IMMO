'use client';

import { useState, useEffect } from 'react';
import {
  Building2,
  Search,
  CheckCircle,
  XCircle,
  Star,
  Eye,
  MapPin,
  Filter,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Sidebar from '@/components/dashboard/Sidebar';
import { propertyService } from '@/services/propertyService';
import { Property } from '@/types/property';
import toast from 'react-hot-toast';

export default function AdminListingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [listings, setListings] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12;

  useEffect(() => { loadListings(); }, []);

  const loadListings = async () => {
    setLoading(true);
    try {
      const data = await propertyService.getAll();
      setListings(data);
    } catch {
      toast.error('Erreur lors du chargement des annonces');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await propertyService.updateStatus(id, 'APPROVED');
      toast.success('Annonce approuvée');
      loadListings();
    } catch { toast.error("Erreur lors de l'approbation"); }
  };

  const handleReject = async (id: string) => {
    try {
      await propertyService.updateStatus(id, 'REJECTED');
      toast.success('Annonce rejetée');
      loadListings();
    } catch { toast.error('Erreur lors du rejet'); }
  };

  const handleFeature = async (id: string) => {
    try {
      await propertyService.setFeatured(id);
      toast.success('Annonce mise en avant');
      loadListings();
    } catch { toast.error('Erreur lors de la mise en avant'); }
  };

  const filtered = listings.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      APPROVED: 'bg-green-100 text-green-700',
      PENDING: 'bg-yellow-100 text-yellow-700',
      REJECTED: 'bg-red-100 text-red-700',
    };
    return styles[status] || 'bg-gray-100 text-gray-600';
  };

  const filterTabs = ['ALL', 'PENDING', 'APPROVED', 'REJECTED'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar role="admin" isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-24'}`}>
        <div className="p-6 lg:p-8">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Annonces</h1>
              <p className="text-gray-500 mt-1">{listings.length} annonces sur la plateforme</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Rechercher par titre ou ville..."
                value={searchTerm}
                onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 w-72"
              />
            </div>
          </motion.div>

          <div className="flex items-center gap-2 mb-6">
            {filterTabs.map(tab => (
              <button
                key={tab}
                onClick={() => { setStatusFilter(tab); setCurrentPage(1); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  statusFilter === tab
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {tab === 'ALL' ? 'Toutes' : tab === 'PENDING' ? 'En attente' : tab === 'APPROVED' ? 'Approuvées' : 'Rejetées'}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20 text-gray-400">Chargement...</div>
          ) : paginated.length === 0 ? (
            <div className="text-center py-20 text-gray-400">Aucune annonce trouvée</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginated.map((p, idx) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300">
                    {p.images?.[0]?.image_url ? (
                      <img src={p.images[0].image_url} alt={p.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <Building2 size={48} />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusBadge(p.status)}`}>
                        {p.status === 'APPROVED' ? 'Approuvée' : p.status === 'PENDING' ? 'En attente' : 'Rejetée'}
                      </span>
                    </div>
                    {p.is_featured && (
                      <div className="absolute top-3 left-3 bg-purple-600 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                        <Star size={12} />
                        En avant
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-900 truncate flex-1">{p.title}</h3>
                      <span className="text-red-600 font-bold ml-2">{p.price.toLocaleString()} {p.currency}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                      <MapPin size={14} />
                      {p.neighborhood}, {p.city}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                      <span className="px-2 py-0.5 bg-gray-100 rounded">{p.property_type}</span>
                      <span>{p.size_m2} m²</span>
                    </div>
                    <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => handleApprove(p.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-green-50 text-green-600 rounded-xl text-sm font-medium hover:bg-green-100 transition-colors"
                        title="Approuver"
                      >
                        <CheckCircle size={16} />
                        Approuver
                      </button>
                      <button
                        onClick={() => handleReject(p.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
                        title="Rejeter"
                      >
                        <XCircle size={16} />
                        Rejeter
                      </button>
                      <button
                        onClick={() => handleFeature(p.id)}
                        className={`p-2 rounded-xl transition-colors ${
                          p.is_featured
                            ? 'bg-purple-100 text-purple-600'
                            : 'bg-gray-100 text-gray-500 hover:bg-purple-100 hover:text-purple-600'
                        }`}
                        title="Mettre en avant"
                      >
                        <Star size={16} />
                      </button>
                      <Link
                        href={`/properties/${p.id}`}
                        className="p-2 rounded-xl bg-gray-100 text-gray-500 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                        title="Voir"
                      >
                        <Eye size={16} />
                      </Link>
                    </div>
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
                    className={`w-9 h-9 rounded-lg text-sm font-medium ${p === currentPage ? 'bg-red-600 text-white' : 'border border-gray-200 hover:bg-gray-50'}`}>
                    {p}
                  </button>
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
