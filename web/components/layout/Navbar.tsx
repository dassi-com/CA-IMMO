'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Home, Search, LayoutDashboard, Heart, PlusCircle, LogIn } from 'lucide-react';
import Logo from '@/components/ui/logo';
import { useAuth } from '@/contexts/AuthContext';

const activeLink = 'text-primary-600 font-medium';
const idleLink = 'text-gray-600 hover:text-primary-600';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, isAgent, isAdmin, getDashboardLink } = useAuth();

  const isDashActive = pathname.startsWith('/dashboard') || pathname.startsWith('/tenant') || pathname.startsWith('/agent') || pathname.startsWith('/admin');

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-border shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-5">
            <Link
              href="/"
              className={`flex items-center space-x-1 text-sm transition-all duration-200 ${pathname === '/' ? activeLink : idleLink}`}
            >
              <Home size={16} />
              <span>Accueil</span>
            </Link>

            <Link
              href="/search"
              className={`flex items-center space-x-1 text-sm transition-all duration-200 ${pathname === '/search' ? activeLink : idleLink}`}
            >
              <Search size={16} />
              <span>Recherche</span>
            </Link>

            {isAuthenticated && (
              <Link
                href={getDashboardLink()}
                className={`flex items-center space-x-1 text-sm transition-all duration-200 ${isDashActive ? activeLink : idleLink}`}
              >
                <LayoutDashboard size={16} />
                <span>Tableau de bord</span>
              </Link>
            )}

            {isAuthenticated && (
              <Link
                href="/favorites"
                className={`flex items-center transition-all duration-200 ${pathname === '/favorites' ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'}`}
              >
                <Heart size={16} />
              </Link>
            )}

            {(isAgent || isAdmin) && (
              <Link
                href="/post-property"
                className="flex items-center space-x-1 bg-primary-600 text-white px-3 py-1.5 rounded-xl text-sm hover:bg-primary-700 shadow-card hover:shadow-card-hover transition-all duration-200"
              >
                <PlusCircle size={14} />
                <span>Publier un bien</span>
              </Link>
            )}

            {!isAuthenticated && (
              <Link
                href="/login"
                className="flex items-center space-x-1 bg-primary-600 text-white px-3 py-1.5 rounded-xl text-sm hover:bg-primary-700 shadow-card hover:shadow-card-hover transition-all duration-200"
              >
                <LogIn size={14} />
                <span>Connexion</span>
              </Link>
            )}
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center space-x-4 md:hidden">
            {isAuthenticated && (
              <Link
                href="/favorites"
                className={`p-1.5 rounded-full transition-all duration-200 ${pathname === '/favorites' ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-primary-600'}`}
              >
                <Heart size={20} />
              </Link>
            )}

            {!isAuthenticated && (
              <Link
                href="/login"
                className="p-1.5 rounded-full text-gray-600 hover:text-primary-600 transition-all duration-200"
              >
                <LogIn size={20} />
              </Link>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 rounded-full text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in-up">
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-card transition-all duration-200 ${pathname === '/' ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'}`}
              >
                <Home size={18} />
                <span>Accueil</span>
              </Link>

              <Link
                href="/search"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-card transition-all duration-200 ${pathname === '/search' ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'}`}
              >
                <Search size={18} />
                <span>Recherche</span>
              </Link>

              {isAuthenticated && (
                <Link
                  href={getDashboardLink()}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-card transition-all duration-200 ${isDashActive ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'}`}
                >
                  <LayoutDashboard size={18} />
                  <span>Tableau de bord</span>
                </Link>
              )}

              {!isAuthenticated && (
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-card transition-all duration-200 text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                >
                  <LogIn size={18} />
                  <span>Connexion</span>
                </Link>
              )}

              {(isAgent || isAdmin) && (
                <div className="pt-2 mt-1 border-t border-border">
                  <Link
                    href="/post-property"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 bg-primary-600 text-white px-4 py-2.5 rounded-card text-sm font-medium hover:bg-primary-700 shadow-card transition-all duration-200"
                  >
                    <PlusCircle size={16} />
                    <span>Publier un bien</span>
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