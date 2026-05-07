// services/authService.ts
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== 'false';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: 'tenant' | 'agent' | 'admin';
}

export const login = async (email: string, password: string, rememberMe?: boolean): Promise<{ user: User; token: string }> => {
  if (USE_MOCK) {
    await delay(800);
    const mockUser: User = {
      id: '1',
      fullName: 'John Doe',
      email: email,
      phoneNumber: '+241 XX XX XX XX',
      role: 'tenant',
    };
    const mockToken = 'mock-jwt-token';
    localStorage.setItem('token', mockToken);
    return { user: mockUser, token: mockToken };
  }
  
  // TODO: Décommenter quand l'API est prête
  // const response = await api.post('/auth/login', { email, password, rememberMe });
  // if (response.data.token) localStorage.setItem('token', response.data.token);
  // return response.data;
  throw new Error('API not ready');
};

export const register = async (data: {
  fullName: string;
  email: string;
  phoneNumber: string;
  accountType: 'tenant' | 'agent';
  password: string;
}): Promise<{ user: User; token: string }> => {
  if (USE_MOCK) {
    await delay(1000);
    const mockUser: User = {
      id: Date.now().toString(),
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      role: data.accountType,
    };
    const mockToken = 'mock-jwt-token';
    localStorage.setItem('token', mockToken);
    return { user: mockUser, token: mockToken };
  }
  
  // TODO: Décommenter quand l'API est prête
  // const response = await api.post('/auth/register', data);
  // if (response.data.token) localStorage.setItem('token', response.data.token);
  // return response.data;
  throw new Error('API not ready');
};

export const logout = async (): Promise<void> => {
  if (!USE_MOCK) {
    // await api.post('/auth/logout');
  }
  localStorage.removeItem('token');
};

export const getCurrentUser = async (): Promise<User | null> => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  if (USE_MOCK) {
    await delay(300);
    return {
      id: '1',
      fullName: 'John Doe',
      email: 'user@example.com',
      phoneNumber: '+241 XX XX XX XX',
      role: 'tenant',
    };
  }
  
  // TODO: Décommenter quand l'API est prête
  // try {
  //   const response = await api.get('/auth/me');
  //   return response.data;
  // } catch {
  //   return null;
  // }
  return null;
};