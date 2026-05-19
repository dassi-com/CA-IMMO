'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { api } from '@/services/api';

interface City {
  id: string;
  name: string;
  country: string;
  slug: string;
  image_url: string;
  property_count: number;
  is_active: boolean;
}

export default function ExplorePopularCities() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCities = async () => {
      try {
        // Appel API pour récupérer les villes populaires
        const response = await api.get('/cities/popular');
        setCities(response.data);
      } catch (error) {
        console.error('Error loading cities:', error);
        setCities([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadCities();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
            <div className="h-4 w-64 bg-gray-200 rounded mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (cities.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Explore Popular Cities</h2>
          <p className="text-gray-600 mt-2">Discover properties in Africa's most vibrant cities</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {cities.map((city) => (
            <Link
              key={city.id}
              href={`/search?city=${encodeURIComponent(city.name)}`}
              className="group relative h-64 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={city.image_url}
                alt={city.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 20vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-xl">{city.name}</h3>
                <p className="text-white/80 text-sm">{city.country}</p>
                <p className="text-white/60 text-xs mt-1">{city.property_count} properties</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}