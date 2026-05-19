export type ListingType = 'sale' | 'rent';
export type PropertyTypeCategory = 'MAISON' | 'BUREAU' | 'ENTREPOT' | 'LOCAL_COMMERCIAL' | 'TERRAIN';
export type PropertyStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Agent {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  avatar?: string;
  agency?: string;
  rating?: number;
  listings?: number;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  order: number;
}

export interface Property {
  id: string;
  owner_id: string;
  title: string;
  slug: string;
  description: string;
  country: string;
  city: string;
  neighborhood: string;
  address: string;
  property_type: PropertyTypeCategory;
  listingType: ListingType;
  price: number;
  currency: string;
  priceUnit: string;
  size_m2: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  is_featured: boolean;
  is_deleted: boolean;
  status: PropertyStatus;
  verified: boolean;
  isNew: boolean;
  isUrgent: boolean;
  features: string[];
  images: string[];
  image_urls?: string[];
  agent?: Agent;
  owner?: Agent;
  created_at: string;
  createdAt: string;
  updated_at: string;
}

export interface PropertyFilters {
  city?: string;
  property_type?: PropertyTypeCategory;
  listingType?: ListingType;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  is_featured?: boolean;
  status?: PropertyStatus;
}