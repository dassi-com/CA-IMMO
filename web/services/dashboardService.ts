import { api } from './api';
import { Property } from '@/types/property';

export interface OwnerStats {
  totalListings: number;
  activeListings: number;
  pendingListings: number;
  totalViews: number;
  totalContacts: number;
}

export const dashboardService = {
  // Owner dashboard — récupère ses annonces
  getMyProperties: async (): Promise<Property[]> => {
    const response = await api.get('/properties/my/listings');
    return response.data.data;
  },
};