'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Home, Search, LayoutDashboard, Heart, PlusCircle, User } from 'lucide-react';

import Logo from '@/components/ui/logo';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/search', label: 'Search', icon: Search },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/favorites', label: 'Favorites', icon: Heart },
  ];

  // Vérifier si un lien est actif (supporte les routes dynamiques comme /properties/123)
  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo />

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center space-x-5">
            {navLinks.map((link) => {
              const isActive = isActiveLink(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-1 text-sm transition ${
                    isActive 
                      ? 'text-red-600 font-medium' 
                      : 'text-gray-600 hover:text-red-600'
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

          {/* Navigation Mobile - Icônes visibles */}
          <div className="flex items-center space-x-4 md:hidden">
            {/* Favorites Icon */}
            <Link 
              href="/favorites" 
              className={`p-1.5 rounded-full transition ${
                pathname === '/favorites' ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:text-red-600'
              }`}
            >
              <Heart size={20} />
            </Link>
            
            {/* Profile Icon */}
            <Link 
              href="/profile" 
              className={`p-1.5 rounded-full transition ${
                pathname === '/profile' ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:text-red-600'
              }`}
            >
              <User size={20} />
            </Link>

            {/* Menu Burger */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="p-1.5 rounded-full text-gray-600 hover:text-red-600 hover:bg-red-50 transition"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu (Home, Search, Dashboard, Post Property) */}
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
                <span className="text-sm font-medium">Home</span>
              </Link>
              
              <Link 
                href="/search" 
                onClick={() => setIsMenuOpen(false)} 
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition ${
                  pathname === '/search' ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                <Search size={18} />
                <span className="text-sm font-medium">Search</span>
              </Link>
              
              <Link 
                href="/dashboard" 
                onClick={() => setIsMenuOpen(false)} 
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition ${
                  pathname.startsWith('/dashboard') ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                <LayoutDashboard size={18} />
                <span className="text-sm font-medium">Dashboard</span>
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