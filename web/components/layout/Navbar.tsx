'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, PlusCircle, LogIn } from 'lucide-react';
import Logo from '@/components/ui/logo';
import { useAuth } from '@/contexts/AuthContext';
import NotificationBell from '@/components/dashboard/NotificationBell';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, isAgent } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-5">
            {isAuthenticated && <NotificationBell />}

            {isAgent && (
              <Link
                href="/post-property"
                className="flex items-center space-x-1 bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-700 transition"
              >
                <PlusCircle size={14} />
                <span>Publier un bien</span>
              </Link>
            )}

            {!isAuthenticated && (
              <Link
                href="/login"
                className="flex items-center space-x-1 bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-700 transition"
              >
                <LogIn size={14} />
                <span>Connexion</span>
              </Link>
            )}
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center space-x-4 md:hidden">
            {isAuthenticated && <NotificationBell />}

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
              {!isAuthenticated && (
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-lg transition text-gray-600 hover:text-red-600 hover:bg-red-50"
                >
                  <LogIn size={18} />
                  <span>Connexion</span>
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
