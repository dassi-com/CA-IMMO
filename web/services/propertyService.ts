import { api } from './api';

export type PropertyType = 'MAISON' | 'BUREAU' | 'ENTREPOT' | 'LOCAL_COMMERCIAL' | 'TERRAIN';
export type PropertyStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Property {
  id: string;
  owner_id: string;
  title: string;
  description: string;
  country: string;
  city: string;
  neighborhood: string;
  address: string;
  property_type: PropertyType;
  price: number;
  currency: string;
  size_m2: number;
  is_featured: boolean;
  is_deleted: boolean;
  status: PropertyStatus;
  images?: { image_url: string; order: number }[];
  created_at: string;
}

export interface PropertyFilters {
  city?: string;
  property_type?: PropertyType;
  minPrice?: number;
  maxPrice?: number;
  status?: PropertyStatus;
  is_featured?: boolean;
}

export const propertyService = {
  // Récupérer toutes les propriétés (avec filtres)
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

  // Modifier une propriété (OWNER or ADMIN)
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

  // Mettre en avant (OWNER after payment or ADMIN)
  setFeatured: async (id: string, is_featured: boolean): Promise<Property> => {
    const response = await api.patch(`/properties/${id}/featured`, { is_featured });
    return response.data;
  },

  // Récupérer les propriétés d'un propriétaire (OWNER only)
  getOwnerProperties: async (ownerId: string): Promise<Property[]> => {
    const response = await api.get(`/users/${ownerId}/properties`);
    return response.data;
  },
};