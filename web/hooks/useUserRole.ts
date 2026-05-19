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
      return '/dashboard/admin';
    case 'agent':
      return '/dashboard/agent';
    case 'tenant':
      return '/dashboard/tenant';
    default:
      return '/dashboard/tenant';
  }
};
