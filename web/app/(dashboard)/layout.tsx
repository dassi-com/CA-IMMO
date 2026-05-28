'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const roleRouteMap: Record<string, string> = {
  '/admin': 'ADMIN',
  '/agent': 'OWNER',
  '/tenant': 'TENANT',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, isAuthenticated, getDashboardLink } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }

    const requiredRole = roleRouteMap[pathname];
    if (requiredRole && user?.role !== requiredRole) {
      router.replace(getDashboardLink());
    }
  }, [isLoading, isAuthenticated, user, pathname, router, getDashboardLink]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const requiredRole = roleRouteMap[pathname];
  if (requiredRole && user?.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}