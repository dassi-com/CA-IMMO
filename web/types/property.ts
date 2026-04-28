export type ListingType = 'buy' | 'rent' | 'relocate';
export type PropertyType = 'villa' | 'apartment' | 'house' | 'land' | 'commercial' | 'office';

export interface Agent {
  id: string;
  name: string;
  agency: string;
  rating: number;
  listings: number;
  avatar?: string;
  phone: string;
  email: string;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  price: number;
  priceUnit: string;
  listingType: ListingType;
  type: PropertyType;
  location: string;
  city: string;
  country: string;
  rooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  surface?: number;
  landSize?: number;
  description: string;
  features: string[];
  images: string[];
  verified: boolean;
  isNew: boolean;
  isUrgent: boolean;
  isFeatured: boolean;
  agent: Agent;
  createdAt: string;
}