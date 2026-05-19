'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Home, Search, LayoutDashboard, Heart, PlusCircle, LogOut } from 'lucide-react';
import { useUserRole, getDashboardLink } from '@/hooks/useUserRole';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const userRole = useUserRole();
  const { logout } = useAuth();
  const [dashboardLink, setDashboardLink] = useState('/dashboard/tenant');

  useEffect(() => {
    setDashboardLink(getDashboardLink(userRole));
  }, [userRole]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const navItems = [
    { href: dashboardLink, label: 'Dashboard', icon: LayoutDashboard },
    { href: '/properties', label: 'Mes annonces', icon: Home },
    { href: '/search', label: 'Rechercher', icon: Search },
    { href: '/favorites', label: 'Favoris', icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md min-h-screen hidden md:block">
          <div className="p-6">
            <h2 className="text-xl font-bold text-primary-500">Dashboard</h2>
          </div>
          <nav className="mt-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-6 py-3 transition ${
                    isActive ? 'bg-primary-50 text-primary-500 border-r-4 border-primary-500' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-3 px-6 py-3 text-red-500 hover:bg-gray-100 w-full mt-4 cursor-pointer transition"
            >
              <LogOut size={20} />
              <span>Déconnexion</span>
            </button>
          </nav>
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}