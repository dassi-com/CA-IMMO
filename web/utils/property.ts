// types/property.ts

export interface Agent {
  id: string;
  full_name: string;
  name?: string; // Pour compatibilité
  email: string;
  phone: string;
  agency: string;
  rating: number;
  listings_count: number;
  listings?: number; // Pour compatibilité
  avatar?: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  priceUnit?: string;
  listingType: 'rent' | 'sale';
  property_type: string;
  type?: string; // Pour compatibilité
  
  // Localisation
  neighborhood: string;
  city: string;
  country: string;
  
  // Caractéristiques
  bedrooms: number;
  bathrooms: number;
  surface: number; // Surface en m²
  landSize?: number; // Surface du terrain en m² (optionnel)
  features: string[];
  
  // Images
  images: string[];
  
  // Statuts
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SOLD' | 'RENTED';
  verified: boolean;
  isNew: boolean;
  isUrgent: boolean;
  is_deleted: boolean;
  
  // Agent
  agent: Agent;
  
  // Dates
  created_at: string;
  createdAt?: string; // Pour compatibilité
  updated_at: string;
  
  // Champs optionnels pour compatibilité
  rooms?: number;
  size_m2?: number;
  unit?: string;
  neighborhood_id?: string;
  city_id?: string;
}