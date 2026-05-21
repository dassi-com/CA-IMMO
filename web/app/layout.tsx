import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="pt-16 md:pt-16 pb-16 md:pb-0">
            {children}
          </main>
          <BottomNav />
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        </AuthProvider>
      </body>
    </html>
  );
}