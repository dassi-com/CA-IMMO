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
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  // Connexion
  login: async (email: string, password: string, rememberMe?: boolean): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', { email, password, rememberMe });

    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);

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
    const response = await api.post<LoginResponse>('/auth/register', data);

    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);

    return response.data;
  },

  // Déconnexion
  logout: async (): Promise<void> => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      await api.post('/auth/logout', { refreshToken });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },

  // Récupérer l'utilisateur courant
  getCurrentUser: async (): Promise<User | null> => {
    try {
      const response = await api.get<User>('/auth/me');
      return response.data;
    } catch (error) {
      return null;
    }
  },

  // Rafraîchir le token
  refreshToken: async (): Promise<string | null> => {
    try {
      const token = localStorage.getItem('refreshToken');
      const response = await api.post<{ accessToken: string; refreshToken: string }>('/auth/refresh', { refreshToken: token });
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      return response.data.accessToken;
    } catch (error) {
      return null;
    }
  },
};