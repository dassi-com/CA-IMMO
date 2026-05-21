import { api } from './api';
import { User } from './authService';
import { Property } from '@/types/property';

export const adminService = {
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

  getAllProperties: async (): Promise<Property[]> => {
    const response = await api.get('/properties?limit=100');
    return response.data.data;
  },
};