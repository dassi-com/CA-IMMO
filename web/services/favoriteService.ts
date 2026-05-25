import { api } from './api';
import { Property } from '@/types/property';

export const favoriteService = {
  getFavorites: async (): Promise<Property[]> => {
    const response = await api.get('/favorites');
    return response.data.data;
  },

  addToFavorites: async (propertyId: string): Promise<void> => {
    await api.post(`/favorites/${propertyId}`);
  },

  removeFromFavorites: async (propertyId: string): Promise<void> => {
    await api.delete(`/favorites/${propertyId}`);
  },

  isFavorite: async (propertyId: string): Promise<boolean> => {
    const response = await api.get(`/favorites/${propertyId}/check`);
    return response.data.data.isFavorite;
  },
};