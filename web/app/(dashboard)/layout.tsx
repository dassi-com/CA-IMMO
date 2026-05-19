'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Search, LayoutDashboard, Heart, PlusCircle, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { href: '/dashboard/agent', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/properties', label: 'Mes annonces', icon: Home },
  { href: '/search', label: 'Rechercher', icon: Search },
  { href: '/favorites', label: 'Favoris', icon: Heart },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="bg-gray-50 flex-1" style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <div className="flex min-h-full">
        <aside className="w-64 bg-white shadow-md hidden md:block" style={{ minHeight: 'calc(100vh - 4rem)' }}>
          <div className="p-6">
            <h2 className="text-xl font-bold text-red-600">Dashboard</h2>
          </div>
          <nav className="mt-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-6 py-3 transition ${
                    isActive ? 'bg-red-50 text-red-600 border-r-4 border-red-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-3 px-6 py-3 text-red-600 hover:bg-red-50 w-full mt-4 transition"
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