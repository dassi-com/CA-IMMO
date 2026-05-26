'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CallbackHandler({ accessToken, refreshToken, role }: { accessToken: string | null; refreshToken: string | null; role: string | null }) {
  const router = useRouter();
  const [error, setError] = useState('');

  useEffect(() => {
    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      if (role === 'ADMIN') router.push('/dashboard/admin');
      else if (role === 'OWNER') router.push('/dashboard/agent');
      else if (role === 'TENANT') router.push('/dashboard/tenant');
      else router.push('/');
    } else {
      setError('Authentication failed. No tokens received.');
    }
  }, [accessToken, refreshToken, role, router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={() => router.push('/login')} className="text-red-600 hover:underline">
            Back to login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Signing in...</p>
      </div>
    </div>
  );
}
