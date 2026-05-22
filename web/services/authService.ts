import { api } from './api';

export interface User {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: 'ADMIN' | 'OWNER' | 'TENANT';
  is_verified: boolean;
  is_suspended: boolean;
  is_featured?: boolean;
  avatar_url?: string;
  created_at: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  login: async (email: string, password: string, rememberMe?: boolean): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', { email, password, rememberMe });
    const data = response.data.data;
    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    }
    return data;
  },

  register: async (data: {
    full_name: string;
    email: string;
    phone: string;
    password: string;
    confirm_password: string;
    role: 'TENANT' | 'OWNER';
  }): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    const result = response.data.data;
    if (result.accessToken) {
      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('refreshToken', result.refreshToken);
    }
    return result;
  },

  // Déconnexion
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout', { refreshToken: localStorage.getItem('refreshToken') });
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
      const response = await api.get('/auth/me');
      return response.data.data;
    } catch (error) {
      return null;
    }
  },

  // Mettre à jour le profil
  updateProfile: async (data: { full_name?: string; email?: string; phone?: string; avatar_url?: string }): Promise<User> => {
    const response = await api.put('/auth/profile', data);
    return response.data.data;
  },

  // Upload avatar
  uploadAvatar: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await api.post('/auth/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data.avatar_url;
  },

  // Changer le mot de passe
  changePassword: async (data: { current_password: string; new_password: string; confirm_password: string }): Promise<void> => {
    await api.put('/auth/password', data);
  },

  // Rafraîchir le token
  refreshToken: async (): Promise<string | null> => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await api.post('/auth/refresh', { refreshToken });
      localStorage.setItem('accessToken', response.data.data.accessToken);
      return response.data.data.accessToken;
    } catch (error) {
      return null;
    }
  },
};