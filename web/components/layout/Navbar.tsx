// web/components/layout/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Home, Search, LayoutDashboard, Heart, PlusCircle, User, LogOut } from 'lucide-react';
import Logo from '@/components/ui/logo';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();

  // Fonction pour obtenir le bon lien du dashboard
  const getDashboardLink = () => {
    if (!user) return '/dashboard/tenant';
    
    switch (user.role) {
      case 'ADMIN':
        return '/dashboard/admin';
      case 'OWNER':
        return '/dashboard/agent';
      case 'TENANT':
        return '/dashboard/tenant';
      default:
        return '/dashboard/tenant';
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/search', label: 'Search', icon: Search },
    ...(isAuthenticated ? [{ href: getDashboardLink(), label: 'Dashboard', icon: LayoutDashboard }] : []),
    { href: '/favorites', label: 'Favorites', icon: Heart },
  ];

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === href;
    // Pour le dashboard, vérifier si on est sur n'importe quel dashboard
    if (href.includes('/dashboard')) return pathname.includes('/dashboard');
    return pathname === href;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-5">
            {navLinks.map((link) => {
              const isActive = isActiveLink(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-1 text-sm transition ${
                    isActive ? 'text-red-600 font-medium' : 'text-gray-600 hover:text-red-600'
                  }`}
                >
                  <link.icon size={16} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            
            {isAuthenticated && (
              <Link
                href="/post-property"
                className="flex items-center space-x-1 bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-700 transition"
              >
                <PlusCircle size={14} />
                <span>Post Property</span>
              </Link>
            )}

            {isAuthenticated ? (
              <>
                <Link 
                  href="/profile" 
                  className={`p-1.5 rounded-full transition ${
                    pathname === '/profile' ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                  }`}
                >
                  <User size={20} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-full transition text-gray-600 hover:text-red-600 hover:bg-red-50"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/auth/login" 
                  className="text-gray-600 hover:text-red-600 text-sm"
                >
                  Login
                </Link>
                <Link 
                  href="/auth/register" 
                  className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center space-x-4 md:hidden">
            {isAuthenticated && (
              <Link 
                href="/favorites" 
                className={`p-1.5 rounded-full transition ${
                  pathname === '/favorites' ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:text-red-600'
                }`}
              >
                <Heart size={20} />
              </Link>
            )}
            
            <Link 
              href="/profile" 
              className={`p-1.5 rounded-full transition ${
                pathname === '/profile' ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:text-red-600'
              }`}
            >
              <User size={20} />
            </Link>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="p-1.5 rounded-full text-gray-600 hover:text-red-600 hover:bg-red-50 transition"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-2">
              <Link 
                href="/" 
                onClick={() => setIsMenuOpen(false)} 
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition ${
                  pathname === '/' ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                <Home size={18} />
                <span>Home</span>
              </Link>
              
              <Link 
                href="/search" 
                onClick={() => setIsMenuOpen(false)} 
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition ${
                  pathname === '/search' ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                <Search size={18} />
                <span>Search</span>
              </Link>
              
              {isAuthenticated && (
                <>
                  <Link 
                    href={getDashboardLink()} 
                    onClick={() => setIsMenuOpen(false)} 
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition ${
                      pathname.includes('/dashboard') ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                    }`}
                  >
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                  </Link>
                  
                  <Link 
                    href="/favorites" 
                    onClick={() => setIsMenuOpen(false)} 
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition ${
                      pathname === '/favorites' ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                    }`}
                  >
                    <Heart size={18} />
                    <span>Favorites</span>
                  </Link>

                  <div className="pt-2 mt-1 border-t border-gray-100">
                    <Link 
                      href="/post-property" 
                      onClick={() => setIsMenuOpen(false)} 
                      className="flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-red-700 transition"
                    >
                      <PlusCircle size={16} />
                      <span>Post Property</span>
                    </Link>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-3 py-2.5 rounded-lg transition text-red-600 hover:bg-red-50 w-full mt-2"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </>
              )}

              {!isAuthenticated && (
                <div className="pt-2 mt-1 border-t border-gray-100 space-y-2">
                  <Link 
                    href="/auth/login" 
                    onClick={() => setIsMenuOpen(false)} 
                    className="block text-center text-gray-600 hover:text-red-600 py-2"
                  >
                    Login
                  </Link>
                  <Link 
                    href="/auth/register" 
                    onClick={() => setIsMenuOpen(false)} 
                    className="block text-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}