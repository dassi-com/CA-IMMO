import { api } from './api';

export interface Inquiry {
  id: string;
  property_id: string;
  sender_id?: string;
  name: string;
  phone_number: string;
  message: string;
  created_at: string;
}

export const inquiryService = {
  // Envoyer un message pour une propriété
  send: async (propertyId: string, data: {
    name: string;
    phone_number: string;
    message: string;
  }): Promise<Inquiry> => {
    const response = await api.post(`/properties/${propertyId}/inquiries`, data);
    return response.data;
  },

  // Récupérer les messages d'une propriété (OWNER only)
  getPropertyInquiries: async (propertyId: string): Promise<Inquiry[]> => {
    const response = await api.get(`/properties/${propertyId}/inquiries`);
    return response.data;
  },

  // Récupérer ses propres messages (TENANT only)
  getMyInquiries: async (): Promise<Inquiry[]> => {
    const response = await api.get('/inquiries/my');
    return response.data;
  },
};