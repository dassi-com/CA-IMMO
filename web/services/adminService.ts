import { api } from './api';
import { User } from './authService';

export const adminService = {
  // Gestion utilisateurs
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  updateUserRole: async (userId: string, role: 'ADMIN' | 'OWNER' | 'TENANT'): Promise<User> => {
    const response = await api.patch(`/admin/users/${userId}/role`, { role });
    return response.data;
  },

  suspendUser: async (userId: string, suspend: boolean): Promise<User> => {
    const response = await api.patch(`/admin/users/${userId}/suspend`, { suspend });
    return response.data;
  },

  deleteUser: async (userId: string): Promise<void> => {
    await api.delete(`/admin/users/${userId}`);
  },

  // Statistiques admin
  getStats: async (): Promise<{
    totalUsers: number;
    totalProperties: number;
    pendingProperties: number;
    totalRevenue: number;
  }> => {
    const response = await api.get('/admin/stats');
    return response.data;
  },
};