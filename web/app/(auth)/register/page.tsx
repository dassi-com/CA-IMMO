'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getDashboardLink } from '@/hooks/useUserRole';
import { AlertCircle, Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ 
    full_name: '', 
    email: '', 
    password: '',
    phone: '',
    role: 'TENANT' as 'TENANT' | 'OWNER'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Validation
      if (!formData.full_name || !formData.email || !formData.password || !formData.phone) {
        setError('Tous les champs sont obligatoires');
        setIsLoading(false);
        return;
      }

      // Appel du service de register
      await register({
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.role
      });

      // Récupérer le rôle depuis localStorage
      const userRole = localStorage.getItem('userRole');
      let dashboardRole: 'admin' | 'agent' | 'tenant' = 'tenant';
      if (userRole === 'ADMIN') {
        dashboardRole = 'admin';
      } else if (userRole === 'OWNER') {
        dashboardRole = 'agent';
      }

      const dashboardPath = getDashboardLink(dashboardRole);
      router.push(dashboardPath);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de l\'inscription');
      console.error('Register error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Créer un compte</h1>
          <p className="text-gray-500 mt-2">
            Commencez à explorer les propriétés immobilières
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Full Name Field */}
          <div className="mb-4">
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
              Nom complet
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              placeholder="Entrez votre nom complet"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              placeholder="Entrez votre email"
            />
          </div>

          {/* Phone Field */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              placeholder="Entrez votre téléphone"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              placeholder="Créez un mot de passe"
            />
          </div>

          {/* Role Field */}
          <div className="mb-6">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Type de compte
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            >
              <option value="TENANT">Locataire</option>
              <option value="OWNER">Propriétaire / Agent</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-2.5 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Inscription en cours...</span>
              </>
            ) : (
              'S\'inscrire'
            )}
          </button>

          {/* Sign In Link */}
          <p className="text-center mt-6 text-gray-600">
            Déjà un compte ?{' '}
            <Link href="/login" className="text-red-600 hover:text-red-700 font-semibold">
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}