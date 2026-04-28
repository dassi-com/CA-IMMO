import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';

export const metadata: Metadata = {
  title: 'CentralAfricaHomes - Find Your Dream Property',
  description: 'Discover houses, apartments, land plots, and commercial properties across Gabon, Cameroon, Congo, and beyond',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <Navbar />
        <main className="pb-16 md:pb-0">{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}