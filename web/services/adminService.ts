import { api } from './api';
import { User } from './authService';

export const adminService = {
  // Gestion utilisateurs
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data.data;
  },

  suspendUser: async (userId: string): Promise<User> => {
    const response = await api.patch(`/users/${userId}/suspend`);
    return response.data.data;
  },

  deleteUser: async (userId: string): Promise<void> => {
    await api.delete(`/users/${userId}`);
  },

  getFeaturedAgents: async (): Promise<User[]> => {
    const response = await api.get('/users/featured-agents');
    return response.data.data;
  },
};