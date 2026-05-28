import { api } from './api';
import { Property } from '@/types/property';

export interface Inquiry {
  id: string;
  property_id: string;
  sender_id?: string;
  name: string;
  email?: string;
  phone_number: string;
  message: string;
  created_at: string;
  property?: Property;
}

export const inquiryService = {
  // Envoyer un message pour une propriété
  send: async (propertyId: string, data: {
    name: string;
    phone_number: string;
    message: string;
  }): Promise<Inquiry> => {
    const response = await api.post(`/inquiries/${propertyId}`, data);
    return response.data.data;
  },

  // Récupérer les messages reçus (OWNER only)
  getMyReceivedInquiries: async (): Promise<Inquiry[]> => {
    const response = await api.get('/inquiries/my/received');
    return response.data.data;
  },

  // Récupérer un message spécifique (OWNER or ADMIN)
  getById: async (id: string): Promise<Inquiry> => {
    const response = await api.get(`/inquiries/${id}`);
    return response.data.data;
  },

  // Supprimer un message (ADMIN only)
  delete: async (id: string): Promise<void> => {
    await api.delete(`/inquiries/${id}`);
  },
};