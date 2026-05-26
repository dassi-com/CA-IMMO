'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { propertyService } from '@/services/propertyService';

interface CityCount {
  city: string;
  count: number;
}

const cityImages: Record<string, string> = {
  'Abidjan': 'https://images.unsplash.com/photo-1582266255765-fa5cf1a1d501?w=600&q=80',
  'Bouaké': 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&q=80',
  'Yamoussoukro': 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80',
  'San Pedro': 'https://images.unsplash.com/photo-1487956382158-bb926046304a?w=600&q=80',
  'Korhogo': 'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=600&q=80',
  'Daloa': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
};

export default function ExplorePopularCities() {
  const [cities, setCities] = useState<CityCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCities = async () => {
      try {
        const stats = await propertyService.getStats();
        setCities(stats.cities);
      } catch (error) {
        console.error('Error loading cities:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCities();
  }, []);

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Explore Popular Cities</h2>
          <div className="flex justify-center items-center py-10">
            <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (cities.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 max-w-6xl mx-auto">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="text-3xl font-bold text-gray-900">Explore Popular Cities</h2>
            <p className="text-gray-600 mt-2">Discover properties in the most sought-after locations</p>
          </div>
          <Link
            href="/search"
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition"
          >
            View All
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cities.map((city) => (
            <Link
              key={city.city}
              href={`/search?city=${encodeURIComponent(city.city)}`}
              className="group relative rounded-xl overflow-hidden h-56 block"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${cityImages[city.city] || 'https://images.unsplash.com/photo-1487956382158-bb926046304a?w=600&q=80'})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <div className="flex items-center gap-2 text-white mb-1">
                  <MapPin size={16} className="text-red-400" />
                  <h3 className="font-semibold text-base sm:text-lg">{city.city}</h3>
                </div>
                <p className="text-gray-300 text-sm">{city.count} {city.count > 1 ? 'properties' : 'property'}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
