'use client';

import { useEffect, useState } from 'react';

type UserRole = 'admin' | 'agent' | 'tenant';

export const useUserRole = (): UserRole => {
  const [role, setRole] = useState<UserRole>('tenant');

  useEffect(() => {
    const rawRole = localStorage.getItem('userRole');
    if (rawRole) {
      // Convertir ADMIN -> admin, OWNER -> agent, TENANT -> tenant
      const normalizedRole = 
        rawRole === 'ADMIN' ? 'admin' : 
        rawRole === 'OWNER' ? 'agent' : 
        'tenant';
      setRole(normalizedRole);
    }
  }, []);

  return role;
};

export const getDashboardLink = (role: UserRole): string => {
  switch (role) {
    case 'admin':
      return '/admin';
    case 'agent':
      return '/agent';
    case 'tenant':
      return '/tenant';
    default:
      return '/tenant';
  }
};
