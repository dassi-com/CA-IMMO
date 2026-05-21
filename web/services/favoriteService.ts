import { api } from './api';
import { Property } from '@/types/property';

const handleResponse = <T>(response: { data: { data: T } }): T => response.data.data;

export const favoriteService = {
  getFavorites: async (): Promise<Property[]> => {
    try {
      const response = await api.get('/favorites');
      return handleResponse(response);
    } catch (error: unknown) {
      const err = error as { response?: { status?: number } };
      if (err?.response?.status === 404) return [];
      throw error;
    }
  },

  addToFavorites: async (propertyId: string): Promise<void> => {
    try {
      await api.post(`/favorites/${propertyId}`);
    } catch (error: unknown) {
      const err = error as { response?: { status?: number } };
      if (err?.response?.status !== 404) throw error;
    }
  },

  removeFromFavorites: async (propertyId: string): Promise<void> => {
    try {
      await api.delete(`/favorites/${propertyId}`);
    } catch (error: unknown) {
      const err = error as { response?: { status?: number } };
      if (err?.response?.status !== 404) throw error;
    }
  },

  isFavorite: async (propertyId: string): Promise<boolean> => {
    try {
      const response = await api.get(`/favorites/${propertyId}/check`);
      const data = handleResponse<{ isFavorite: boolean }>(response);
      return data.isFavorite;
    } catch (error: unknown) {
      const err = error as { response?: { status?: number } };
      if (err?.response?.status === 404) return false;
      throw error;
    }
  },
};