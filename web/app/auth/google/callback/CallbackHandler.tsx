'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { authService } from '@/services/authService';

export default function CallbackHandler() {
  const searchParams = useSearchParams();
  const [error, setError] = useState('');

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const role = searchParams.get('role');

    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      authService.getCurrentUser().then(() => {
        if (role === 'ADMIN') window.location.href = '/admin';
        else if (role === 'OWNER') window.location.href = '/agent';
        else if (role === 'TENANT') window.location.href = '/tenant';
        else window.location.href = '/';
      }).catch(() => {
        if (role === 'ADMIN') window.location.href = '/admin';
        else if (role === 'OWNER') window.location.href = '/agent';
        else if (role === 'TENANT') window.location.href = '/tenant';
        else window.location.href = '/';
      });
    } else {
      setError('Authentication failed. No tokens received.');
    }
  }, [searchParams]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <a href="/login" className="text-red-600 hover:underline inline-block">
            Back to login
          </a>
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
