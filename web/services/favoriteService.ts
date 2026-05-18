import { api } from './api';
import { Property } from './propertyService';

export const favoriteService = {
  // Récupérer les favoris de l'utilisateur
  getFavorites: async (): Promise<Property[]> => {
    const response = await api.get('/favorites');
    return response.data;
  },

  // Ajouter aux favoris
  addToFavorites: async (propertyId: string): Promise<void> => {
    await api.post(`/favorites/${propertyId}`);
  },

  // Retirer des favoris
  removeFromFavorites: async (propertyId: string): Promise<void> => {
    await api.delete(`/favorites/${propertyId}`);
  },

  // Vérifier si une propriété est dans les favoris
  isFavorite: async (propertyId: string): Promise<boolean> => {
    const response = await api.get(`/favorites/${propertyId}/check`);
    return response.data.isFavorite;
  },
};