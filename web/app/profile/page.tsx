'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Mail,
  User,
  Phone,
  CheckCircle,
  Building2,
  Home,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthLoading, isAuthenticated, router]);

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 pb-24">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-8 text-white text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold">{user.full_name}</h1>
            <p className="text-white/80 mt-1">{user.email}</p>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-800">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Téléphone</p>
                  <p className="font-medium text-gray-800">{user.phone || 'Non renseigné'}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                {user.role === 'OWNER' ? <Building2 className="w-5 h-5 text-gray-500" /> : <Home className="w-5 h-5 text-gray-500" />}
                <div>
                  <p className="text-sm text-gray-500">Rôle</p>
                  <p className="font-medium text-gray-800">
                    {user.role === 'ADMIN' ? 'Administrateur' : user.role === 'OWNER' ? 'Agent immobilier' : 'Locataire'}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 text-xs rounded-full ${
                user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' :
                user.role === 'OWNER' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {user.role}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Statut</p>
                  <p className="font-medium text-gray-800">{user.is_verified ? 'Vérifié' : 'Non vérifié'}</p>
                </div>
              </div>
              <span className={`px-3 py-1 text-xs rounded-full ${
                user.is_verified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {user.is_verified ? 'Actif' : 'En attente'}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 mt-6 px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition font-medium"
            >
              <LogOut size={20} />
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
