'use client';

import { useState, useEffect } from 'react';
import {
  Building2,
  Plus,
  Edit,
  Trash2,
  Search,
  MapPin,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Sidebar from '@/components/dashboard/Sidebar';
import { propertyService } from '@/services/propertyService';
import { Property } from '@/types/property';
import toast from 'react-hot-toast';

export default function AgentListingsPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [listings, setListings] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { loadListings(); }, []);

  const loadListings = async () => {
    setLoading(true);
    try {
      const data = await propertyService.getMyListings();
      setListings(data);
    } catch {
      toast.error('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette annonce ?')) return;
    try {
      await propertyService.delete(id);
      toast.success('Annonce supprimée');
      loadListings();
    } catch {
      toast.error('Erreur lors de la suppression');
    }
  };

  const filtered = listings.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusBadge = (status: string) => {
    const s: Record<string, string> = { APPROVED: 'bg-green-100 text-green-700', PENDING: 'bg-yellow-100 text-yellow-700', REJECTED: 'bg-red-100 text-red-700' };
    return s[status] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar role="agent" isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-24'}`}>
        <div className="p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Mes annonces</h1>
              <p className="text-gray-500 mt-1">{listings.length} annonce(s)</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" placeholder="Rechercher..." value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 w-56" />
              </div>
              <Link href="/post-property"
                className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors">
                <Plus size={18} />
                Nouvelle annonce
              </Link>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-gray-400">Chargement...</div>
            ) : filtered.length === 0 ? (
              <div className="p-12 text-center text-gray-400">Aucune annonce trouvée</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Annonce</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Localisation</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Prix</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Statut</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtered.map((p, idx) => (
                      <motion.tr key={p.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.03 }} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                              {p.images?.[0]?.image_url ? (
                                <img src={p.images[0].image_url} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <Building2 size={20} className="text-gray-400" />
                              )}
                            </div>
                            <div className="font-medium text-gray-900 truncate max-w-[250px]">{p.title}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-sm text-gray-600">
                            <MapPin size={14} />
                            {p.city}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900">{p.price.toLocaleString()} {p.currency}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusBadge(p.status)}`}>
                            {p.status === 'APPROVED' ? 'Approuvée' : p.status === 'PENDING' ? 'En attente' : 'Rejetée'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{new Date(p.created_at).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Link href={`/properties/${p.id}/edit`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Edit size={18} />
                            </Link>
                            <button onClick={() => handleDelete(p.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
