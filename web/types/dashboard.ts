
export interface DashboardStats {
  title: string;
  value: number | string;
  icon: any;
  trend?: number;
  trendLabel?: string;
  color: string;
}

export interface Visit {
  id: string;
  propertyTitle: string;
  date: string;
  time: string;
  agentName: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface Alert {
  id: string;
  type: 'price' | 'area' | 'rooms';
  criteria: string;
  value: string;
  active: boolean;
}

export interface Listing {
  id: string;
  title: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'FEATURED';
  views: number;
  contacts: number;
  agentName?: string;
  date?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'tenant' | 'agent' | 'admin';
  date: string;
  status?: 'active' | 'suspended';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}