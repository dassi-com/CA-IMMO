'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, LayoutDashboard, Heart, User } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const items = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/search', label: 'Search', icon: Search },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/favorites', label: 'Favorites', icon: Heart },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  // Vérifier si un lien est actif
  const isActive = (href: string) => {
    if (href === '/') return pathname === href;
    if (href === '/dashboard') return pathname.startsWith('/dashboard');
    return pathname === href;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 md:hidden z-50 pb-safe">
      <div className="flex justify-around items-center py-1">
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-1.5 px-3 rounded-lg transition ${
                active ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
              }`}
            >
              <item.icon size={20} />
              <span className={`text-xs mt-1 font-medium ${active ? 'text-red-600' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}