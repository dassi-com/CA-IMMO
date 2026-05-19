'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, User } from '@/services/authService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<any>;
  register: (data: any) => Promise<any>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isOwner: boolean;
  isTenant: boolean;
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
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string, rememberMe?: boolean) => {
    const response = await authService.login(email, password, rememberMe);
    setUser(response.user);
    // Sauvegarder le rôle pour utilisation dans les composants
    localStorage.setItem('userRole', response.user.role.toLowerCase());
    return response; // ← Retourner la réponse
  };

  const register = async (data: any) => {
    const response = await authService.register(data);
    setUser(response.user);
    // Sauvegarder le rôle pour utilisation dans les composants
    localStorage.setItem('userRole', response.user.role.toLowerCase());
    return response; // ← Retourner la réponse
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    localStorage.removeItem('userRole');
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
    isOwner: user?.role === 'OWNER',
    isTenant: user?.role === 'TENANT',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};