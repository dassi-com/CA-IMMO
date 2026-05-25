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
  updated_at: string;
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
    
    if (response.data.data.accessToken) {
      localStorage.setItem('accessToken', response.data.data.accessToken);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
    }
    
    return response.data.data;
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
    
    if (response.data.data.accessToken) {
      localStorage.setItem('accessToken', response.data.data.accessToken);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
    }
    
    return response.data.data;
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

  // Mettre à jour le profil
  updateProfile: async (data: { full_name: string; email: string; phone: string }): Promise<User> => {
    const response = await api.put('/users/profile', data);
    return response.data.data;
  },

  // Changer le mot de passe
  changePassword: async (data: { current_password: string; new_password: string }): Promise<void> => {
    await api.put('/users/profile/password', data);
  },

  // Uploader un avatar
  uploadAvatar: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await api.post('/users/profile/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data.avatar_url;
  },
};