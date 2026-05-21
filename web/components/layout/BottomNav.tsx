'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, LayoutDashboard, Heart, User, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function BottomNav() {
  const pathname = usePathname();
  const { isAuthenticated, getDashboardLink } = useAuth();

  const isActive = (href: string) => {
    if (href === '/') return pathname === href;
    if (href.includes('/dashboard')) return pathname.includes('/dashboard');
    return pathname === href;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 md:hidden z-50 pb-safe">
      <div className="flex justify-around items-center py-1">
        <Link
          href="/"
          className={`flex flex-col items-center py-1.5 px-3 rounded-lg transition ${
            isActive('/') ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
          }`}
        >
          <Home size={20} />
          <span className={`text-xs mt-1 font-medium ${isActive('/') ? 'text-red-600' : 'text-gray-500'}`}>Home</span>
        </Link>

        <Link
          href="/search"
          className={`flex flex-col items-center py-1.5 px-3 rounded-lg transition ${
            isActive('/search') ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
          }`}
        >
          <Search size={20} />
          <span className={`text-xs mt-1 font-medium ${isActive('/search') ? 'text-red-600' : 'text-gray-500'}`}>Search</span>
        </Link>

        {isAuthenticated ? (
          <>
            <Link
              href={getDashboardLink()}
              className={`flex flex-col items-center py-1.5 px-3 rounded-lg transition ${
                pathname.includes('/dashboard') ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
              }`}
            >
              <LayoutDashboard size={20} />
              <span className={`text-xs mt-1 font-medium ${pathname.includes('/dashboard') ? 'text-red-600' : 'text-gray-500'}`}>Dashboard</span>
            </Link>

            <Link
              href="/favorites"
              className={`flex flex-col items-center py-1.5 px-3 rounded-lg transition ${
                isActive('/favorites') ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
              }`}
            >
              <Heart size={20} />
              <span className={`text-xs mt-1 font-medium ${isActive('/favorites') ? 'text-red-600' : 'text-gray-500'}`}>Favorites</span>
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className={`flex flex-col items-center py-1.5 px-3 rounded-lg transition ${
                isActive('/login') ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
              }`}
            >
              <LogIn size={20} />
              <span className={`text-xs mt-1 font-medium ${isActive('/login') ? 'text-red-600' : 'text-gray-500'}`}>Sign In</span>
            </Link>
          </>
        )}

        <Link
          href={isAuthenticated ? getDashboardLink() : '/register'}
          className={`flex flex-col items-center py-1.5 px-3 rounded-lg transition ${
            isActive(getDashboardLink()) ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
          }`}
        >
          <User size={20} />
          <span className={`text-xs mt-1 font-medium ${isActive(getDashboardLink()) ? 'text-red-600' : 'text-gray-500'}`}>Account</span>
        </Link>
      </div>
    </div>
  );
}