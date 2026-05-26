'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Home, Search, LayoutDashboard, Heart, PlusCircle, LogIn } from 'lucide-react';
import Logo from '@/components/ui/logo';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, isAgent, getDashboardLink } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-5">
            <Link
              href="/"
              className={`flex items-center space-x-1 text-sm transition ${
                pathname === '/' ? 'text-red-600 font-medium' : 'text-gray-600 hover:text-red-600'
              }`}
            >
              <Home size={16} />
              <span>Home</span>
            </Link>

            <Link
              href="/search"
              className={`flex items-center space-x-1 text-sm transition ${
                pathname === '/search' ? 'text-red-600 font-medium' : 'text-gray-600 hover:text-red-600'
              }`}
            >
              <Search size={16} />
              <span>Search</span>
            </Link>

            {isAuthenticated && (
              <Link
                href={getDashboardLink()}
                className={`flex items-center space-x-1 text-sm transition ${
                  pathname.includes('/dashboard') ? 'text-red-600 font-medium' : 'text-gray-600 hover:text-red-600'
                }`}
              >
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </Link>
            )}

            {isAuthenticated && (
              <Link
                href="/favorites"
                className={`flex items-center space-x-1 text-sm transition ${
                  pathname === '/favorites' ? 'text-red-600 font-medium' : 'text-gray-600 hover:text-red-600'
                }`}
              >
                <Heart size={16} />
                <span>Favorites</span>
              </Link>
            )}

            {isAgent && (
              <Link
                href="/post-property"
                className="flex items-center space-x-1 bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-700 transition"
              >
                <PlusCircle size={14} />
                <span>Post Property</span>
              </Link>
            )}

            {!isAuthenticated && (
              <Link
                href="/login"
                className="flex items-center space-x-1 bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-700 transition"
              >
                <LogIn size={14} />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile Icons */}
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

            {!isAuthenticated && (
              <Link
                href="/login"
                className="p-1.5 rounded-full text-gray-600 hover:text-red-600 transition"
              >
                <LogIn size={20} />
              </Link>
            )}

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
              )}

              {isAuthenticated && (
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
              )}

              {!isAuthenticated && (
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-lg transition text-gray-600 hover:text-red-600 hover:bg-red-50"
                >
                  <LogIn size={18} />
                  <span>Sign In</span>
                </Link>
              )}

              {isAgent && (
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
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
