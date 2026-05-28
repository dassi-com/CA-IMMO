import { api } from './api';

export interface FeatureRequestResponse {
  id: string;
  requester_id: string;
  target: 'AGENT' | 'PROPERTY';
  target_id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  reason?: string;
  created_at: string;
  updated_at: string;
  reviewed_by?: string;
  reviewed_at?: string;
  rejection_reason?: string;
  requester?: {
    id: string;
    full_name: string;
    email: string;
    role: string;
  };
  agent?: {
    id: string;
    full_name: string;
    email: string;
  };
  property?: {
    id: string;
    title: string;
    city: string;
  };
}

export const featureRequestService = {
  getPending: async (target?: 'AGENT' | 'PROPERTY'): Promise<{ requests: FeatureRequestResponse[]; meta: any }> => {
    const params = new URLSearchParams();
    if (target) params.set('target', target);
    const response = await api.get(`/feature-requests/pending?${params}`);
    return response.data;
  },

  approve: async (requestId: string): Promise<FeatureRequestResponse> => {
    const response = await api.patch(`/feature-requests/${requestId}/approve`);
    return response.data.data;
  },

  reject: async (requestId: string, rejection_reason?: string): Promise<FeatureRequestResponse> => {
    const response = await api.patch(`/feature-requests/${requestId}/reject`, { rejection_reason });
    return response.data.data;
  },
};
