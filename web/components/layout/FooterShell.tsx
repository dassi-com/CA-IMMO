'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';
import BottomNav from './BottomNav';
import { useSidebar } from '@/contexts/SidebarContext';

const DASHBOARD_PREFIXES = ['/tenant', '/agent', '/admin'];

export default function FooterShell() {
  const pathname = usePathname();
  const { isSidebarOpen } = useSidebar();
  const isDashboard = DASHBOARD_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + '/')
  );

  return (
    <div className={isDashboard ? (isSidebarOpen ? 'lg:ml-72' : 'lg:ml-24') : ''}>
      <Footer />
      <BottomNav />
    </div>
  );
}