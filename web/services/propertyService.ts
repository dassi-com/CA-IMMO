// services/propertyService.ts
import { api } from './api';
import { Property, PropertyFilters, PropertyStatus } from '@/types/property';
export type { Property };

export const propertyService = {
  // Récupérer toutes les propriétés
  getAll: async (filters?: PropertyFilters): Promise<Property[]> => {
    const response = await api.get('/properties', { params: filters });
    return response.data;
  },

  // Récupérer les propriétés en vedette
  getFeatured: async (): Promise<Property[]> => {
    const response = await api.get('/properties/featured');
    return response.data;
  },

  // Récupérer les propriétés en attente (ADMIN only)
  getPending: async (): Promise<Property[]> => {
    const response = await api.get('/properties/pending');
    return response.data;
  },

  // Récupérer une propriété par ID
  getById: async (id: string): Promise<Property> => {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  },

  // Créer une propriété (OWNER only)
  create: async (data: FormData): Promise<Property> => {
    const response = await api.post('/properties', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // Modifier une propriété (OWNER of property or ADMIN)
  update: async (id: string, data: Partial<Property>): Promise<Property> => {
    const response = await api.put(`/properties/${id}`, data);
    return response.data;
  },

  // Supprimer une propriété (soft delete)
  delete: async (id: string): Promise<void> => {
    await api.delete(`/properties/${id}`);
  },

  // Changer le statut (ADMIN only)
  updateStatus: async (id: string, status: PropertyStatus): Promise<Property> => {
    const response = await api.patch(`/properties/${id}/status`, { status });
    return response.data;
  },

  // Mettre en avant une propriété (OWNER after payment or ADMIN)
  setFeatured: async (id: string, is_featured: boolean): Promise<Property> => {
    const response = await api.patch(`/properties/${id}/featured`, { is_featured });
    return response.data;
  },

  // Récupérer les propriétés d'un propriétaire spécifique
  getOwnerProperties: async (ownerId: string): Promise<Property[]> => {
    const response = await api.get(`/users/${ownerId}/properties`);
    return response.data;
  },
};

// Exports individuels pour compatibilité avec le code existant
export const getProperties = propertyService.getAll;
export const getFeaturedProperties = propertyService.getFeatured;
export const getPropertyById = propertyService.getById;
export const getPropertiesByListingType = async (listingType: string): Promise<Property[]> => {
  return propertyService.getAll({ listingType: listingType as any });
};