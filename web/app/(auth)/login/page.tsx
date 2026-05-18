'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, Facebook, Chrome } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Connecter avec l'API backend
    // Exemple d'appel API:
    // try {
    //   const response = await axios.post('/api/auth/login', {
    //     email: formData.email,
    //     password: formData.password
    //   });
    //   localStorage.setItem('token', response.data.token);
    //   router.push('/dashboard');
    // } catch (error) {
    //   console.error(error);
    // }
    
    // Simulation d'appel API
    setTimeout(() => {
      setIsLoading(false);
      // Redirection temporaire
      // router.push('/dashboard');
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    // TODO: Implémenter OAuth Google/Facebook
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Profile Icon avec background dégradé rouge foncé */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-red-700 to-red-800 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition duration-300">
            <User className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 mt-2">
            Sign in to access your dashboard and saved properties
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {/* Email Field */}
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-5">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-sm text-red-600 hover:text-red-700 font-medium">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-2.5 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition text-gray-700 font-medium"
            >
              <Chrome className="w-5 h-5" />
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('facebook')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition text-gray-700 font-medium"
            >
              <Facebook className="w-5 h-5 text-blue-600" />
              <span>Facebook</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="text-red-600 hover:text-red-700 font-semibold">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}