import { api } from './api';

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  link?: string;
  created_at: string;
}

export const notificationService = {
  getMyNotifications: async (page = 1, limit = 20): Promise<{ notifications: Notification[]; meta: any }> => {
    const response = await api.get(`/notifications?page=${page}&limit=${limit}`);
    return { notifications: response.data.data, meta: response.data.meta };
  },

  getUnreadCount: async (): Promise<number> => {
    const response = await api.get('/notifications/unread-count');
    return response.data.data.count;
  },

  markAsRead: async (id: string): Promise<Notification> => {
    const response = await api.patch(`/notifications/${id}/read`);
    return response.data.data;
  },

  markAllAsRead: async (): Promise<void> => {
    await api.patch('/notifications/read-all');
  },
};
