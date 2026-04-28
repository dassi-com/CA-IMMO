'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  CheckCircle,
  Building2,
  Home
} from 'lucide-react';

type TabType = 'login' | 'register';
type AccountType = 'tenant' | 'agent';

// Icône Google personnalisée (SVG)
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

// Icône Facebook personnalisée (SVG)
const FacebookIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.49h-2.8V24C19.62 23.1 24 18.1 24 12.07z" />
  </svg>
);

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    accountType: 'tenant' as AccountType,
    password: '',
    confirmPassword: ''
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Appel API login
    console.log('Login:', loginData);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    // TODO: Appel API register
    console.log('Register:', registerData);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  return (
    // Body sans background - juste blanc/transparent
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        
        {/* Bloc unique avec fond rouge transparent + blur */}
        <div className="backdrop-blur-md bg-red-500/10 rounded-3xl shadow-2xl overflow-hidden ">
          
          {/* Header du bloc avec icône profile */}
          <div className="pt-8 pb-4 flex flex-col items-center">
            <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-700 rounded-3xl flex items-center justify-center shadow-lg ring-4 ring-red-400/30">
              <User className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Welcome Text dynamique */}
          <div className="text-center px-6">
            {activeTab === 'login' ? (
              <>
                <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
                <p className="text-gray-600 mt-2 text-sm">
                  Sign in to access your dashboard and saved properties
                </p>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
                <p className="text-gray-600 mt-2 text-sm">
                  Join CentralAfricaHomes to start your property journey
                </p>
              </>
            )}
          </div>

          {/* Tabs */}
          <div className="flex border-b border-red-300/30 mx-6 mt-6">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-3 text-center font-semibold transition relative ${
                activeTab === 'login'
                  ? 'text-red-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign In
              {activeTab === 'login' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-3 text-center font-semibold transition relative ${
                activeTab === 'register'
                  ? 'text-red-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign Up
              {activeTab === 'register' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded-full" />
              )}
            </button>
          </div>

          <div className="p-6 md:p-8">
            {/* LOGIN FORM */}
            {activeTab === 'login' && (
              <form onSubmit={handleLogin}>
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      required
                      className="block w-full pl-10 pr-3 py-2.5 bg-white/60 border border-red-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition text-gray-800 placeholder-gray-400"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      required
                      className="block w-full pl-10 pr-10 py-2.5 bg-white/60 border border-red-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition text-gray-800 placeholder-gray-400"
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

                <div className="flex items-center justify-between mb-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={loginData.rememberMe}
                      onChange={handleLoginChange}
                      className="w-4 h-4 rounded border-red-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <button type="button" className="text-sm text-red-600 hover:text-red-700 font-medium">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-2.5 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-200 disabled:opacity-50 shadow-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-red-300/30" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-transparent text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('google')}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/60 border border-red-300/30 rounded-xl hover:bg-white/80 transition text-gray-700 font-medium"
                  >
                    <GoogleIcon />
                    <span>Google</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('facebook')}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/60 border border-red-300/30 rounded-xl hover:bg-white/80 transition text-gray-700 font-medium"
                  >
                    <FacebookIcon />
                    <span>Facebook</span>
                  </button>
                </div>

                <p className="text-center mt-6 text-gray-600">
                  Don't have an account?{' '}
                  <button type="button" onClick={() => setActiveTab('register')} className="text-red-600 hover:text-red-700 font-semibold">
                    Sign Up
                  </button>
                </p>
              </form>
            )}

            {/* REGISTER FORM */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegister}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      value={registerData.fullName}
                      onChange={handleRegisterChange}
                      required
                      className="block w-full pl-10 pr-3 py-2.5 bg-white/60 border border-red-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition text-gray-800 placeholder-gray-400"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      required
                      className="block w-full pl-10 pr-3 py-2.5 bg-white/60 border border-red-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition text-gray-800 placeholder-gray-400"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={registerData.phoneNumber}
                      onChange={handleRegisterChange}
                      required
                      className="block w-full pl-10 pr-3 py-2.5 bg-white/60 border border-red-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition text-gray-800 placeholder-gray-400"
                      placeholder="+241 XX XX XX XX"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Type
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {registerData.accountType === 'agent' ? (
                        <Building2 className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Home className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <select
                      name="accountType"
                      value={registerData.accountType}
                      onChange={handleRegisterChange}
                      className="block w-full pl-10 pr-3 py-2.5 bg-white/60 border border-red-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition appearance-none text-gray-800"
                    >
                      <option value="tenant">Regular User (Tenant)</option>
                      <option value="agent">Agent (Post & Promote Listings)</option>
                    </select>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Choose 'Agent' if you want to post properties and promote listings
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      required
                      className="block w-full pl-10 pr-10 py-2.5 bg-white/60 border border-red-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition text-gray-800 placeholder-gray-400"
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

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CheckCircle className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                      required
                      className="block w-full pl-10 pr-10 py-2.5 bg-white/60 border border-red-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition text-gray-800 placeholder-gray-400"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-2.5 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-200 disabled:opacity-50 shadow-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Creating account...</span>
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-red-300/30" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-transparent text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('google')}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/60 border border-red-300/30 rounded-xl hover:bg-white/80 transition text-gray-700 font-medium"
                  >
                    <GoogleIcon />
                    <span>Google</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('facebook')}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/60 border border-red-300/30 rounded-xl hover:bg-white/80 transition text-gray-700 font-medium"
                  >
                    <FacebookIcon />
                    <span>Facebook</span>
                  </button>
                </div>

                <p className="text-center mt-6 text-gray-600">
                  Already have an account?{' '}
                  <button type="button" onClick={() => setActiveTab('login')} className="text-red-600 hover:text-red-700 font-semibold">
                    Sign In
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}