'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { api } from '@/services/api';

interface PropertyTypeStats {
  id: string;
  name: string;
  slug: string;
  count: number;
  image_url: string;
  color: string;
}

// Mapping des couleurs par type (pour rester cohérent)
const colorMap: Record<string, string> = {
  'MAISON': 'bg-blue-500',
  'BUREAU': 'bg-green-500',
  'ENTREPOT': 'bg-orange-500',
  'LOCAL_COMMERCIAL': 'bg-purple-500',
  'TERRAIN': 'bg-emerald-500',
  'APPARTEMENT': 'bg-indigo-500',
  'VILLA': 'bg-rose-500',
};

// Images par défaut si l'API n'en fournit pas
const defaultImages: Record<string, string> = {
  'MAISON': 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
  'BUREAU': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
  'ENTREPOT': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop',
  'LOCAL_COMMERCIAL': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
  'TERRAIN': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop',
  'APPARTEMENT': 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
  'VILLA': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop',
};

export default function BrowseByPropertyType() {
  const [propertyTypes, setPropertyTypes] = useState<PropertyTypeStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPropertyTypes = async () => {
      try {
        // Appel API pour récupérer les types de biens avec leurs comptes
        const response = await api.get('/property-types/stats');
        setPropertyTypes(response.data);
      } catch (error) {
        console.error('Error loading property types:', error);
        // Fallback avec données par défaut mais comptes à 0
        setPropertyTypes([
          { id: 'MAISON', name: 'Villas & Maisons', slug: 'maison', count: 0, image_url: defaultImages['MAISON'], color: 'bg-blue-500' },
          { id: 'BUREAU', name: 'Bureaux', slug: 'bureau', count: 0, image_url: defaultImages['BUREAU'], color: 'bg-green-500' },
          { id: 'ENTREPOT', name: 'Entrepôts', slug: 'entrepot', count: 0, image_url: defaultImages['ENTREPOT'], color: 'bg-orange-500' },
          { id: 'LOCAL_COMMERCIAL', name: 'Locaux Commerciaux', slug: 'commercial', count: 0, image_url: defaultImages['LOCAL_COMMERCIAL'], color: 'bg-purple-500' },
          { id: 'TERRAIN', name: 'Terrains', slug: 'terrain', count: 0, image_url: defaultImages['TERRAIN'], color: 'bg-emerald-500' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadPropertyTypes();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
            <div className="h-4 w-64 bg-gray-200 rounded mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Browse by Property Type</h2>
          <p className="text-gray-600 mt-2">Find exactly what you're looking for</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {propertyTypes.map((type) => (
            <Link
              key={type.id}
              href={`/search?property_type=${type.slug || type.id}`}
              className="group relative overflow-hidden rounded-xl border border-gray-200 hover:border-red-200 hover:shadow-lg transition-all duration-300 bg-white"
            >
              {/* Image de fond */}
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={type.image_url}
                  alt={type.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              
              {/* Contenu */}
              <div className="p-4 text-center">
                <div className={`w-12 h-12 ${type.color} bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <div className={`w-6 h-6 ${type.color.replace('bg-', 'bg-')} bg-opacity-100 rounded-full`}></div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">{type.name}</h3>
                <p className="text-xs text-gray-500">{type.count} properties</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}