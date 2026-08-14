import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Monabris - Where Vision Finds Home',
  description: 'Monabris — le réseau immobilier premium en Afrique centrale. Maisons, appartements, terrains et biens commerciaux de confiance.',
  applicationName: 'Monabris',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var stored = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (stored === 'dark' || (!stored && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-monabris-background text-monabris-text antialiased">
        <ThemeProvider>
          <AuthProvider>
            <NotificationProvider>
            <Navbar />
            <main className="pt-16 md:pt-16 pb-16 md:pb-0">
              {children}
            </main>
            <Footer />
            <BottomNav />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: { borderRadius: '12px', padding: '12px 16px', background: '#171717', color: '#FFFFFF' },
                success: { iconTheme: { primary: '#16A34A', secondary: '#fff' } },
                error: { iconTheme: { primary: '#C41E3A', secondary: '#fff' } },
              }}
            />
            </NotificationProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}