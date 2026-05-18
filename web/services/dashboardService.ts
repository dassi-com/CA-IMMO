import { api } from './api';
import { Property } from '@/types/property';

// Statistiques Tenant
export interface TenantStats {
  favoritesCount: number;
  upcomingVisits: number;
  messagesSent: number;
  activeAlerts: number;
}

// Statistiques OWNER
export interface OwnerStats {
  totalListings: number;
  activeListings: number;
  pendingListings: number;
  totalViews: number;
  totalContacts: number;
  monthlyViews: { month: string; views: number }[];
}

// Statistiques ADMIN
export interface AdminStats {
  totalUsers: number;
  totalOwners: number;
  totalTenants: number;
  totalProperties: number;
  pendingProperties: number;
  featuredProperties: number;
  totalRevenue: number;
  monthlyRevenue: { month: string; amount: number }[];
}

export const dashboardService = {
  // Tenant dashboard
  getTenantStats: async (): Promise<TenantStats> => {
    const response = await api.get('/dashboard/tenant/stats');
    return response.data;
  },

  // Owner dashboard
  getOwnerStats: async (): Promise<OwnerStats> => {
    const response = await api.get('/dashboard/owner/stats');
    return response.data;
  },

  getOwnerProperties: async (): Promise<Property[]> => {
    const response = await api.get('/dashboard/owner/properties');
    return response.data;
  },

  // Admin dashboard
  getAdminStats: async (): Promise<AdminStats> => {
    const response = await api.get('/dashboard/admin/stats');
    return response.data;
  },
};