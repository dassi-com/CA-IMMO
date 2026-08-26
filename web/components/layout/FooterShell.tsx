'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';
import BottomNav from './BottomNav';
import { useSidebar } from '@/contexts/SidebarContext';

const DASHBOARD_PREFIXES = ['/tenant', '/agent', '/admin'];
const AUTH_ROUTES = ['/login', '/register'];

export default function FooterShell() {
  const pathname = usePathname();
  const { isSidebarOpen } = useSidebar();
  const isAuthPage = AUTH_ROUTES.includes(pathname);
  const isDashboard = DASHBOARD_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + '/')
  );

  if (isAuthPage) return null;

  return (
    <div className={isDashboard ? (isSidebarOpen ? 'lg:ml-[280px]' : 'lg:ml-20') : ''}>
      <Footer />
      <BottomNav />
    </div>
  );
}