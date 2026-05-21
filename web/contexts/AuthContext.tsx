'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { authService, User, AuthResponse } from '@/services/authService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ user: User } & AuthResponse>;
  register: (data: { full_name: string; email: string; phone: string; password: string; confirm_password: string; role: 'TENANT' | 'OWNER' }) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isAgent: boolean;
  isTenant: boolean;
  getDashboardLink: () => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      Promise.resolve().then(() => {
        setUser(null);
        setIsLoading(false);
      });
      return;
    }
    Promise.resolve().then(() => checkAuth());
  }, [checkAuth]);

  const login = async (email: string, password: string, rememberMe?: boolean) => {
    const tokens = await authService.login(email, password, rememberMe);
    const currentUser = await authService.getCurrentUser();
    if (currentUser) setUser(currentUser);
    return { ...tokens, user: currentUser! };
  };

  const register = async (data: { full_name: string; email: string; phone: string; password: string; confirm_password: string; role: 'TENANT' | 'OWNER' }) => {
    await authService.register(data);
    const currentUser = await authService.getCurrentUser();
    if (currentUser) setUser(currentUser);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const getDashboardLink = useCallback(() => {
    if (!user) return '/login';
    switch (user.role) {
      case 'ADMIN': return '/dashboard/admin';
      case 'OWNER': return '/dashboard/agent';
      case 'TENANT': return '/dashboard/tenant';
      default: return '/login';
    }
  }, [user]);

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
    isAgent: user?.role === 'OWNER',
    isTenant: user?.role === 'TENANT',
    getDashboardLink,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};