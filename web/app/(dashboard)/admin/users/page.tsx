'use client';

import { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Shield,
  XCircle,
  Mail,
  Phone,
  Calendar,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/dashboard/Sidebar';
import { adminService } from '@/services/adminService';
import { User } from '@/services/authService';
import toast from 'react-hot-toast';

export default function AdminUsersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAllUsers();
      setUsers(data);
    } catch {
      toast.error('Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  const handleSuspend = async (userId: string) => {
    try {
      await adminService.suspendUser(userId);
      toast.success('Utilisateur suspendu');
      loadUsers();
    } catch {
      toast.error("Erreur lors de la suspension");
    }
  };

  const handleUnsuspend = async (userId: string) => {
    try {
      await adminService.unsuspendUser(userId);
      toast.success('Utilisateur réactivé');
      loadUsers();
    } catch {
      toast.error("Erreur lors de la réactivation");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;
    try {
      await adminService.deleteUser(userId);
      toast.success('Utilisateur supprimé');
      loadUsers();
    } catch {
      toast.error('Erreur lors de la suppression');
    }
  };

  const filtered = users.filter(
    u => u.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const roleBadge = (role: string) => {
    const styles: Record<string, string> = {
      ADMIN: 'bg-purple-100 text-purple-700',
      OWNER: 'bg-blue-100 text-blue-700',
      TENANT: 'bg-gray-100 text-gray-700',
    };
    return styles[role] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar role="admin" isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-24'}`}>
        <div className="p-4 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Utilisateurs</h1>
              <p className="text-gray-500 mt-1">{users.length} utilisateurs inscrits</p>
            </div>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Rechercher..." value={searchTerm}
                onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full sm:w-64 pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-gray-400">Chargement...</div>
            ) : paginated.length === 0 ? (
              <div className="p-12 text-center text-gray-400">Aucun utilisateur trouvé</div>
            ) : (
              <>
                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Utilisateur</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Rôle</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Statut</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Inscrit le</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {paginated.map((u, idx) => (
                        <motion.tr key={u.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.03 }} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">{u.full_name.charAt(0)}</div>
                              <div>
                                <div className="font-medium text-gray-900">{u.full_name}</div>
                                <div className="text-sm text-gray-500">{u.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${roleBadge(u.role)}`}>{u.role}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full ${!u.is_suspended ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${u.is_suspended ? 'bg-red-600' : 'bg-green-600'}`} />
                              {u.is_suspended ? 'Suspendu' : 'Actif'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">{new Date(u.created_at).toLocaleDateString()}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {u.is_suspended ? (
                                <button onClick={() => handleUnsuspend(u.id)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Réactiver"><Shield size={18} /></button>
                              ) : (
                                <button onClick={() => handleSuspend(u.id)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Suspendre"><Shield size={18} /></button>
                              )}
                              <button onClick={() => handleDeleteUser(u.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer"><XCircle size={18} /></button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="md:hidden divide-y divide-gray-100">
                  {paginated.map((u, idx) => (
                    <motion.div key={u.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }} className="p-4 space-y-3 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-lg flex-shrink-0">{u.full_name.charAt(0)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{u.full_name}</p>
                          <p className="text-sm text-gray-500 truncate">{u.email}</p>
                          {u.phone && <p className="text-xs text-gray-400">{u.phone}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${roleBadge(u.role)}`}>{u.role}</span>
                        <span className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${!u.is_suspended ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${u.is_suspended ? 'bg-red-600' : 'bg-green-600'}`} />
                          {u.is_suspended ? 'Suspendu' : 'Actif'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">{new Date(u.created_at).toLocaleDateString()}</span>
                        <div className="flex items-center gap-2">
                          {u.is_suspended ? (
                            <button onClick={() => handleUnsuspend(u.id)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"><Shield size={18} /></button>
                          ) : (
                            <button onClick={() => handleSuspend(u.id)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Shield size={18} /></button>
                          )}
                          <button onClick={() => handleDeleteUser(u.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><XCircle size={18} /></button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}

            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-gray-100 gap-3">
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
