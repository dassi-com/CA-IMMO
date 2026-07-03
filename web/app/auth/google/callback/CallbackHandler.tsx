'use client';

import { useEffect, useState } from 'react';
import { authService } from '@/services/authService';

export default function CallbackHandler() {
  const [error, setError] = useState('');

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');
    const role = params.get('role');

    window.location.hash = '';

    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      authService.getCurrentUser().then((user) => {
        const targetRole = user?.role || role;
        if (targetRole === 'ADMIN') window.location.href = '/admin';
        else if (targetRole === 'OWNER') window.location.href = '/agent';
        else if (targetRole === 'TENANT') window.location.href = '/tenant';
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
  }, []);

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
