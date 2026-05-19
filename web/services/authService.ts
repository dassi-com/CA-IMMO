import { api } from './api';

export interface User {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: 'ADMIN' | 'OWNER' | 'TENANT';
  is_verified: boolean;
  is_suspended: boolean;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  // Connexion
  login: async (email: string, password: string, rememberMe?: boolean): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', { email, password, rememberMe });
    
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('userRole', response.data.user.role);
      localStorage.setItem('userId', response.data.user.id);
    }
    
    return response.data;
  },

  // Inscription
  register: async (data: {
    full_name: string;
    email: string;
    phone: string;
    password: string;
    role: 'TENANT' | 'OWNER';
  }): Promise<LoginResponse> => {
    const response = await api.post('/auth/register', data);
    
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('userRole', response.data.user.role);
      localStorage.setItem('userId', response.data.user.id);
    }
    
    return response.data;
  },

  // Déconnexion
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userId');
    }
  },

  // Récupérer l'utilisateur courant
  getCurrentUser: async (): Promise<User | null> => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      return null;
    }
  },

  // Rafraîchir le token
  refreshToken: async (): Promise<string | null> => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await api.post('/auth/refresh', { refreshToken });
      localStorage.setItem('accessToken', response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      return null;
    }
  },
};