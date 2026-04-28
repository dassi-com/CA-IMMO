// À remplacer par les vrais appels API quand le backend sera prêt
// TODO: Remplacer par import api from './api'
// TODO: Remplacer les appels par api.get('/properties') etc.

import propertiesData from '@/lib/data/properties.json';
import { Property } from '@/types/property';

// Données fictives (à remplacer par API)
export const getProperties = async (filters?: any): Promise<Property[]> => {
  // TODO: Remplacer par const response = await api.get('/properties', { params: filters })
  // TODO: return response.data
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulation délai
  return propertiesData.properties as Property[];
};

export const getFeaturedProperties = async (): Promise<Property[]> => {
  // TODO: Remplacer par const response = await api.get('/properties/featured')
  const properties = await getProperties();
  return properties.filter(p => p.isFeatured);
};

export const getPropertyById = async (id: string): Promise<Property | null> => {
  // TODO: Remplacer par const response = await api.get(`/properties/${id}`)
  const properties = await getProperties();
  return properties.find(p => p.id === id) || null;
};

export const getPropertiesByListingType = async (listingType: string): Promise<Property[]> => {
  // TODO: Remplacer par const response = await api.get(`/properties?listingType=${listingType}`)
  const properties = await getProperties();
  return properties.filter(p => p.listingType === listingType);
};