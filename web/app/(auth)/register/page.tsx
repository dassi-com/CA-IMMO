'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Building2, User, Mail, Lock, Phone, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const { register: authRegister } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'TENANT' as 'TENANT' | 'OWNER',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validation des champs
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validation du nom
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom complet est requis';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Le nom doit contenir au moins 3 caractères';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Le nom ne doit pas dépasser 100 caractères';
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }

    // Validation du téléphone (obligatoire, format international exigé par le backend)
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else {
      const phoneRegex = /^\+[\d\s\-\(\)\.]{7,20}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        newErrors.phone = 'Entrez un numéro valide avec indicatif (ex: +237691234567)';
      }
    }

    // Validation du mot de passe
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre';
    }

    // Validation de la confirmation du mot de passe
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'La confirmation du mot de passe est requise';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Effacer l'erreur du champ quand l'utilisateur commence à taper
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Valider le formulaire
    if (!validateForm()) {
      toast.error('Veuillez corriger les erreurs du formulaire');
      return;
    }

    setIsLoading(true);
    try {
      await authRegister({
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirm_password: formData.password,
        role: formData.role,
      });
      toast.success('Compte créé avec succès! Redirection en cours...');
      
      // Attendre un peu avant de rediriger pour que le toast soit visible
      setTimeout(() => {
        if (formData.role === 'OWNER') {
          router.push('/agent');
        } else {
          router.push('/');
        }
      }, 1500);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string; errors?: Array<{ field: string; message: string }> } } };
      const data = err?.response?.data;
      const fieldMap: Record<string, string> = { full_name: 'name' };
      if (data?.errors && Array.isArray(data.errors)) {
        const fieldErrors: Record<string, string> = {};
        data.errors.forEach((e) => {
          const key = fieldMap[e.field] || e.field;
          fieldErrors[key] = e.message;
        });
        setErrors(prev => ({ ...prev, ...fieldErrors }));
        const allMessages = data.errors.map((e) => e.message).join(', ');
        toast.error(allMessages);
      } else {
        const msg = data?.message || "Erreur lors de l'inscription";
        setErrors(prev => ({ ...prev, submit: msg }));
        toast.error(msg);
      }
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderErrorMessage = (fieldName: string) => {
    if (!errors[fieldName]) return null;
    return (
      <div className="flex items-center gap-2 mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
        <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
        <span className="text-sm text-red-600">{errors[fieldName]}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Créer un compte</h1>
          <p className="text-gray-500 mt-2">
            Rejoignez CentralAfricaHomes
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {/* Erreur d'enregistrement globale */}
          {errors.submit && (
            <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <span className="text-sm text-red-600">{errors.submit}</span>
            </div>
          )}

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Je suis
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role: 'TENANT' }))}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition ${
                  formData.role === 'TENANT'
                    ? 'border-red-600 bg-red-50 text-red-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <User size={20} />
                <span className="font-medium text-sm">Locataire</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role: 'OWNER' }))}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition ${
                  formData.role === 'OWNER'
                    ? 'border-red-600 bg-red-50 text-red-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <Building2 size={20} />
                <span className="font-medium text-sm">Agent</span>
              </button>
            </div>
          </div>

          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nom complet
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Votre nom"
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition ${
                errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-red-500'
              }`}
            />
            {renderErrorMessage('name')}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Votre email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition ${
                  errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-red-500'
                }`}
              />
            </div>
            {renderErrorMessage('email')}
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+237691234567"
                value={formData.phone}
                onChange={handleChange}
                required
                className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition ${
                  errors.phone ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-red-500'
                }`}
              />
            </div>
            {renderErrorMessage('phone')}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Votre mot de passe"
                value={formData.password}
                onChange={handleChange}
                required
                className={`w-full pl-10 pr-10 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition ${
                  errors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-red-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {renderErrorMessage('password')}
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirmer mot de passe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirmer votre mot de passe"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className={`w-full pl-10 pr-10 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition ${
                  errors.confirmPassword ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-red-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {renderErrorMessage('confirmPassword')}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-2.5 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Inscription...</span>
              </div>
            ) : (
              "S'inscrire"
            )}
          </button>

          <p className="text-center text-gray-600 mt-6">
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