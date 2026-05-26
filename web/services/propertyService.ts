import { api } from './api';
import { Property, PropertyFilters, PropertyStatus } from '@/types/property';

export interface CreatePropertyPayload {
  title: string;
  description: string;
  country: string;
  city: string;
  neighborhood: string;
  address: string;
  property_type: string;
  price: number;
  currency?: string;
  size_m2: number;
}

export const propertyService = {
  getAll: async (filters?: PropertyFilters): Promise<Property[]> => {
    const response = await api.get('/properties', { params: filters });
    return response.data.data;
  },

  getFeatured: async (): Promise<Property[]> => {
    const response = await api.get('/properties', { params: { limit: 6, sort: 'newest' } });
    return response.data.data;
  },

  getPending: async (): Promise<Property[]> => {
    const response = await api.get('/properties/pending');
    return response.data.data;
  },

  getById: async (id: string): Promise<Property> => {
    const response = await api.get(`/properties/${id}`);
    return response.data.data;
  },

  create: async (data: CreatePropertyPayload): Promise<Property> => {
    const response = await api.post('/properties', data);
    return response.data.data;
  },

  update: async (id: string, data: Partial<CreatePropertyPayload>): Promise<Property> => {
    const response = await api.put(`/properties/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/properties/${id}`);
  },

  updateStatus: async (id: string, status: PropertyStatus): Promise<Property> => {
    const response = await api.patch(`/properties/${id}/status`, { status });
    return response.data.data;
  },

  setFeatured: async (id: string): Promise<Property> => {
    const response = await api.patch(`/properties/${id}/feature`);
    return response.data.data;
  },

  getMyListings: async (): Promise<Property[]> => {
    const response = await api.get('/properties/my/listings');
    return response.data.data;
  },

  getStats: async (): Promise<{ cities: { city: string; count: number }[]; propertyTypes: { type: string; count: number }[] }> => {
    const response = await api.get('/properties/stats');
    return response.data.data;
  },
};

export const getProperties = propertyService.getAll;
export const getFeaturedProperties = propertyService.getFeatured;
export const getPropertyById = propertyService.getById;
