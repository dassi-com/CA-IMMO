'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';
import BottomNav from './BottomNav';

const DASHBOARD_PREFIXES = ['/tenant', '/agent', '/admin'];

export default function FooterShell() {
  const pathname = usePathname();
  const isDashboard = DASHBOARD_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + '/')
  );

  if (isDashboard) return null;

  return (
    <>
      <Footer />
      <BottomNav />
    </>
  );
}
