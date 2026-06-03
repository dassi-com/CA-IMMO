import axios from 'axios';
import { api } from './api';
import { User } from './authService';
import { Property } from '@/types/property';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

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

  unsuspendUser: async (userId: string): Promise<User> => {
    const response = await api.patch(`/users/${userId}/unsuspend`);
    return response.data.data;
  },

  deleteUser: async (userId: string): Promise<void> => {
    await api.delete(`/users/${userId}`);
  },

  getAllProperties: async (): Promise<Property[]> => {
    const response = await api.get('/properties');
    return response.data.data;
  },

  getAgents: async (): Promise<User[]> => {
    const response = await api.get('/users?role=OWNER');
    return response.data.data;
  },

  toggleFeaturedAgent: async (userId: string): Promise<User> => {
    const response = await api.patch(`/users/${userId}/feature`);
    return response.data.data;
  },

  getFeaturedAgents: async (): Promise<User[]> => {
    const response = await axios.get(`${API_BASE_URL}/users/featured-agents`);
    return response.data.data;
  },
};