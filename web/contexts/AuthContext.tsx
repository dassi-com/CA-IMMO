'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { authService, User, LoginResponse } from '@/services/authService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<LoginResponse>;
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

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      checkAuth();
    } else {
      setIsLoading(false);
    }
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem('userRole', currentUser.role);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string, rememberMe?: boolean) => {
    const response = await authService.login(email, password, rememberMe);
    if (response.user) {
      setUser(response.user);
      localStorage.setItem('userRole', response.user.role);
    }
    return response;
  };

  const register = async (data: { full_name: string; email: string; phone: string; password: string; confirm_password: string; role: 'TENANT' | 'OWNER' }) => {
    const response = await authService.register(data);
    if (response.user) {
      setUser(response.user);
      localStorage.setItem('userRole', response.user.role);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    localStorage.removeItem('userRole');
  };

  const getDashboardLink = useCallback(() => {
    if (!user) return '/login';
    switch (user.role) {
      case 'ADMIN': return '/admin';
      case 'OWNER': return '/agent';
      case 'TENANT': return '/tenant';
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