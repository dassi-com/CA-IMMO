// services/propertyService.ts
import propertiesData from '@/lib/data/properties.json';
import { Property } from '@/types/property';
import axios from 'axios';

// Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== 'false';

// Instance axios pour les futurs appels API
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Simulation de délai réseau (pour le mode mock)
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// ============ PROPRIÉTÉS ============

export const getProperties = async (filters?: any): Promise<Property[]> => {
  if (USE_MOCK) {
    await delay(500);
    let properties = propertiesData.properties as Property[];
    
    // Appliquer les filtres si présents
    if (filters) {
      if (filters.listingType) {
        properties = properties.filter(p => p.listingType === filters.listingType);
      }
      if (filters.type) {
        properties = properties.filter(p => p.type === filters.type);
      }
      if (filters.city) {
        properties = properties.filter(p => p.city === filters.city);
      }
      if (filters.minPrice) {
        properties = properties.filter(p => p.price >= filters.minPrice);
      }
      if (filters.maxPrice) {
        properties = properties.filter(p => p.price <= filters.maxPrice);
      }
    }
    
    return properties;
  }
  
  // TODO: Décommenter quand l'API est prête
  // const response = await api.get('/properties', { params: filters });
  // return response.data;
  return [];
};

export const getFeaturedProperties = async (): Promise<Property[]> => {
  if (USE_MOCK) {
    await delay(300);
    const properties = propertiesData.properties as Property[];
    return properties.filter(p => p.isFeatured);
  }
  
  // TODO: Décommenter quand l'API est prête
  // const response = await api.get('/properties/featured');
  // return response.data;
  return [];
};

export const getPropertyById = async (id: string): Promise<Property | null> => {
  if (USE_MOCK) {
    await delay(300);
    const properties = propertiesData.properties as Property[];
    return properties.find(p => p.id === id) || null;
  }
  
  // TODO: Décommenter quand l'API est prête
  // const response = await api.get(`/properties/${id}`);
  // return response.data;
  return null;
};

export const getPropertiesByListingType = async (listingType: string): Promise<Property[]> => {
  if (USE_MOCK) {
    await delay(300);
    const properties = propertiesData.properties as Property[];
    return properties.filter(p => p.listingType === listingType);
  }
  
  // TODO: Décommenter quand l'API est prête
  // const response = await api.get(`/properties?listingType=${listingType}`);
  // return response.data;
  return [];
};

// ============ NOUVELLES FONCTIONS POUR LES FAVORIS ============

export const getFavorites = async (): Promise<Property[]> => {
  if (USE_MOCK) {
    await delay(300);
    const properties = propertiesData.properties as Property[];
    // Retourne les 3 premières pour l'exemple
    return properties.slice(0, 3);
  }
  
  // TODO: Décommenter quand l'API est prête
  // const response = await api.get('/favorites');
  // return response.data;
  return [];
};

export const addToFavorites = async (propertyId: string): Promise<void> => {
  if (USE_MOCK) {
    await delay(200);
    console.log(`Added property ${propertyId} to favorites (mock)`);
    return;
  }
  
  // TODO: Décommenter quand l'API est prête
  // await api.post(`/favorites/${propertyId}`);
};

export const removeFromFavorites = async (propertyId: string): Promise<void> => {
  if (USE_MOCK) {
    await delay(200);
    console.log(`Removed property ${propertyId} from favorites (mock)`);
    return;
  }
  
  // TODO: Décommenter quand l'API est prête
  // await api.delete(`/favorites/${propertyId}`);
};