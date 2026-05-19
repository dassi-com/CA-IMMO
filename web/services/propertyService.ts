import { api } from './api';
import { Property, PropertyFilters, PropertyStatus } from '@/types/property';

export const propertyService = {
  getAll: async (filters?: PropertyFilters): Promise<Property[]> => {
    const response = await api.get('/properties', { params: filters });
    return response.data;
  },

  getFeatured: async (): Promise<Property[]> => {
    const response = await api.get('/properties/featured');
    return response.data;
  },

  getPending: async (): Promise<Property[]> => {
    const response = await api.get('/properties/pending');
    return response.data;
  },

  getById: async (id: string): Promise<Property> => {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  },

  create: async (data: FormData): Promise<Property> => {
    const response = await api.post('/properties', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  update: async (id: string, data: Partial<Property>): Promise<Property> => {
    const response = await api.put(`/properties/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/properties/${id}`);
  },

  updateStatus: async (id: string, status: PropertyStatus): Promise<Property> => {
    const response = await api.patch(`/properties/${id}/status`, { status });
    return response.data;
  },

  setFeatured: async (id: string, is_featured: boolean): Promise<Property> => {
    const response = await api.patch(`/properties/${id}/featured`, { is_featured });
    return response.data;
  },

  getOwnerProperties: async (ownerId: string): Promise<Property[]> => {
    const response = await api.get(`/users/${ownerId}/properties`);
    return response.data;
  },
};

// Exports pour compatibilité
export const getProperties = propertyService.getAll;
export const getFeaturedProperties = propertyService.getFeatured;
export const getPropertyById = propertyService.getById;
export const getPropertiesByListingType = async (listingType: string): Promise<Property[]> => {
  return propertyService.getAll({ listingType: listingType as any });
};