'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, LayoutDashboard, Heart, User, LogIn } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';

export default function BottomNav() {
  const pathname = usePathname();
  const { isAuthenticated, getDashboardLink } = useAuth();
  const { t } = useTranslation();

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
          <span className={`text-xs mt-1 font-medium ${isActive('/') ? 'text-red-600' : 'text-gray-500'}`}>{t('nav.home')}</span>
        </Link>

        <Link
          href="/search"
          className={`flex flex-col items-center py-1.5 px-3 rounded-lg transition ${
            isActive('/search') ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
          }`}
        >
          <Search size={20} />
          <span className={`text-xs mt-1 font-medium ${isActive('/search') ? 'text-red-600' : 'text-gray-500'}`}>{t('nav.search')}</span>
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
              <span className={`text-xs mt-1 font-medium ${pathname.includes('/dashboard') ? 'text-red-600' : 'text-gray-500'}`}>{t('nav.dashboard')}</span>
            </Link>

            <Link
              href="/favorites"
              className={`flex flex-col items-center py-1.5 px-3 rounded-lg transition ${
                isActive('/favorites') ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
              }`}
            >
              <Heart size={20} />
              <span className={`text-xs mt-1 font-medium ${isActive('/favorites') ? 'text-red-600' : 'text-gray-500'}`}>{t('nav.favorites')}</span>
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
              <span className={`text-xs mt-1 font-medium ${isActive('/login') ? 'text-red-600' : 'text-gray-500'}`}>{t('nav.signIn')}</span>
            </Link>
          </>
        )}

        <Link
          href={isAuthenticated ? '/settings' : '/login'}
          className={`flex flex-col items-center py-1.5 px-3 rounded-lg transition ${
            isActive('/settings') ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
          }`}
        >
          <User size={20} />
          <span className={`text-xs mt-1 font-medium ${isActive('/settings') ? 'text-red-600' : 'text-gray-500'}`}>{t('nav.profile')}</span>
        </Link>
      </div>
    </div>
  );
}