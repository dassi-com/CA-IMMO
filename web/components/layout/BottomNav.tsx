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

  const base = 'flex flex-col items-center py-1.5 px-3 rounded-card transition-all duration-200';
  const active = 'text-primary-600';
  const idle = 'text-gray-500 hover:text-primary-600';

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-border md:hidden z-50 pb-safe">
      <div className="flex justify-around items-center py-1">
        <Link href="/" className={`${base} ${isActive('/') ? active : idle}`}>
          <Home size={20} />
          <span className={`text-xs mt-1 font-medium ${isActive('/') ? 'text-primary-600' : 'text-gray-500'}`}>Accueil</span>
        </Link>

        <Link href="/search" className={`${base} ${isActive('/search') ? active : idle}`}>
          <Search size={20} />
          <span className={`text-xs mt-1 font-medium ${isActive('/search') ? 'text-primary-600' : 'text-gray-500'}`}>Recherche</span>
        </Link>

        {isAuthenticated ? (
          <>
            <Link href={getDashboardLink()} className={`${base} ${pathname.includes('/dashboard') ? active : idle}`}>
              <LayoutDashboard size={20} />
              <span className={`text-xs mt-1 font-medium ${pathname.includes('/dashboard') ? 'text-primary-600' : 'text-gray-500'}`}>Tableau de bord</span>
            </Link>

            <Link href="/favorites" className={`${base} ${isActive('/favorites') ? active : idle}`}>
              <Heart size={20} />
              <span className={`text-xs mt-1 font-medium ${isActive('/favorites') ? 'text-primary-600' : 'text-gray-500'}`}>Favoris</span>
            </Link>
          </>
        ) : (
          <>
            <Link href="/login" className={`${base} ${isActive('/login') ? active : idle}`}>
              <LogIn size={20} />
              <span className={`text-xs mt-1 font-medium ${isActive('/login') ? 'text-primary-600' : 'text-gray-500'}`}>Connexion</span>
            </Link>
          </>
        )}

        <Link
          href={isAuthenticated ? '/settings' : '/login'}
          className={`${base} ${isActive('/settings') ? active : idle}`}
        >
          <User size={20} />
          <span className={`text-xs mt-1 font-medium ${isActive('/settings') ? 'text-primary-600' : 'text-gray-500'}`}>Profil</span>
        </Link>
      </div>
    </div>
  );
}