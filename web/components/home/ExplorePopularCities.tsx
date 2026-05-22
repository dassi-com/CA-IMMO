'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { propertyService } from '@/services/propertyService';

interface CityData {
  city: string;
  country: string;
  count: number;
  image: string;
}

export default function ExplorePopularCities() {
  const [cities, setCities] = useState<CityData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await propertyService.getCitiesWithCounts();
        setCities(data);
      } catch {
        const props = await propertyService.getAll();
        const cityMap = new Map<string, { city: string; count: number; image: string }>();
        const countryMap: Record<string, string> = {
          'Libreville': 'Gabon', 'Douala': 'Cameroon', 'Yaoundé': 'Cameroon',
          'Brazzaville': 'Congo', 'Port-Gentil': 'Gabon', 'Malabo': 'Equatorial Guinea',
        };
        props.forEach(p => {
          const existing = cityMap.get(p.city);
          if (existing) {
            existing.count++;
          } else {
            cityMap.set(p.city, {
              city: p.city,
              count: 1,
              image: p.images?.[0]?.image_url || '',
            });
          }
        });
        const sorted = Array.from(cityMap.values())
          .sort((a, b) => b.count - a.count)
          .slice(0, 6)
          .map(c => ({
            ...c,
            country: countryMap[c.city] || 'Central Africa',
            image: c.image || `https://images.unsplash.com/photo-1580060839134-75f5edde2f11?w=400&q=80`,
          }));
        setCities(sorted);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 text-center text-gray-400">
          Chargement...
        </div>
      </section>
    );
  }

  if (cities.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Explore Popular Cities</h2>
          <p className="text-gray-600 mt-2">Find properties in Central Africa's major cities</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {cities.map((city) => (
            <Link
              key={city.city}
              href={`/search?city=${encodeURIComponent(city.city)}`}
              className="group relative overflow-hidden rounded-xl aspect-square block shadow-md hover:shadow-xl transition"
            >
              <Image
                src={city.image}
                alt={city.city}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="text-base font-bold">{city.city}</h3>
                <p className="text-xs text-white/80">{city.country}</p>
                <p className="text-[10px] text-white/70 mt-1">{city.count} properties</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
