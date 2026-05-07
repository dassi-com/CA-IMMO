// web/components/layout/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Home, Search, LayoutDashboard, Heart, PlusCircle, User } from 'lucide-react';
import Logo from '@/components/ui/logo';


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<'tenant' | 'agent' | 'admin'>('tenant');
  const pathname = usePathname();

  // Récupérer le rôle (pour test, on peut le mettre en dur d'abord)
  useEffect(() => {
    // Pour tester, on met un rôle par défaut
    // Plus tard vous remplacerez par le vrai rôle depuis l'auth
    const role = localStorage.getItem('userRole') as 'tenant' | 'agent' | 'admin';
    if (role) {
      setUserRole(role);
    } else {
      // Rôle par défaut pour tester
      setUserRole('tenant');
    }
  }, []);

  // Fonction pour obtenir le bon lien du dashboard
  const getDashboardLink = () => {
    switch (userRole) {
      case 'admin':
        return '/dashboard/admin';
      case 'agent':
        return '/dashboard/agent';
      case 'tenant':
        return '/dashboard/tenant';
      default:
        return '/dashboard/tenant';
    }
  };

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/search', label: 'Search', icon: Search },
    { href: getDashboardLink(), label: 'Dashboard', icon: LayoutDashboard }, // ← Lien dynamique
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
            
            <Link
              href="/post-property"
              className="flex items-center space-x-1 bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-700 transition"
            >
              <PlusCircle size={14} />
              <span>Post Property</span>
            </Link>

            <Link 
              href="/profile" 
              className={`p-1.5 rounded-full transition ${
                pathname === '/profile' ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              <User size={20} />
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link 
              href="/favorites" 
              className={`p-1.5 rounded-full transition ${
                pathname === '/favorites' ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:text-red-600'
              }`}
            >
              <Heart size={20} />
            </Link>
            
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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}