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

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const authService = {
  // Connexion
  login: async (email: string, password: string, rememberMe?: boolean): Promise<LoginResponse> => {
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', { email, password, rememberMe });
    const result = response.data.data;

    localStorage.setItem('accessToken', result.accessToken);
    localStorage.setItem('refreshToken', result.refreshToken);

    return result;
  },

  // Inscription
  register: async (data: {
    full_name: string;
    email: string;
    phone: string;
    password: string;
    role: 'TENANT' | 'OWNER';
  }): Promise<LoginResponse> => {
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/register', data);
    const result = response.data.data;

    localStorage.setItem('accessToken', result.accessToken);
    localStorage.setItem('refreshToken', result.refreshToken);

    return result;
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
      const response = await api.get<ApiResponse<User>>('/auth/me');
      return response.data.data;
    } catch (error) {
      return null;
    }
  },

  // Rafraîchir le token
  refreshToken: async (): Promise<string | null> => {
    try {
      const token = localStorage.getItem('refreshToken');
      const response = await api.post<ApiResponse<{ accessToken: string; refreshToken: string }>>('/auth/refresh', { refreshToken: token });
      const result = response.data.data;
      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('refreshToken', result.refreshToken);
      return result.accessToken;
    } catch (error) {
      return null;
    }
  },
};