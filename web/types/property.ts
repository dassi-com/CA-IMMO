export type PropertyTypeCategory = 'MAISON' | 'BUREAU' | 'ENTREPOT' | 'LOCAL_COMMERCIAL' | 'TERRAIN';
export type PropertyStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  order: number;
  created_at: string;
}

export interface Owner {
  id: string;
  full_name: string;
  email: string;
  phone: string;
}

export interface Property {
  id: string;
  owner_id: string;
  title: string;
  description: string;
  country: string;
  city: string;
  neighborhood: string;
  address: string;
  property_type: PropertyTypeCategory;
  price: number;
  currency: string;
  size_m2: number;
  is_featured: boolean;
  is_deleted: boolean;
  status: PropertyStatus;
  created_at: string;
  updated_at: string;
  images: PropertyImage[];
  owner?: Owner;
}

export interface PropertyFilters {
  city?: string;
  neighborhood?: string;
  property_type?: PropertyTypeCategory;
  price_min?: number;
  price_max?: number;
  size_min?: number;
  size_max?: number;
  sort?: 'price_asc' | 'price_desc' | 'newest';
}
