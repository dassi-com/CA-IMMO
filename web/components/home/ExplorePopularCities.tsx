'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { propertyService } from '@/services/propertyService';

interface City {
  name: string;
  country: string;
  image: string;
  slug: string;
  count: number;
}

export default function ExplorePopularCities() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCities = async () => {
      try {
        // Récupérer toutes les propriétés pour calculer les villes
        const properties = await propertyService.getAll();
        
        // Compter les propriétés par ville
        const cityMap = new Map<string, { count: number; country: string }>();
        
        properties.forEach(prop => {
          const cityName = prop.city;
          if (cityMap.has(cityName)) {
            cityMap.get(cityName)!.count++;
          } else {
            cityMap.set(cityName, { count: 1, country: prop.country });
          }
        });
        
        // Convertir en tableau et trier par nombre de propriétés
        const cityList = Array.from(cityMap.entries())
          .map(([name, data]) => ({
            name,
            country: data.country,
            slug: name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
            count: data.count,
            image: getCityImage(name),
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);
          
        setCities(cityList);
      } catch (error) {
        console.error('Error loading cities:', error);
        setCities(getDefaultCities());
      } finally {
        setLoading(false);
      }
    };
    
    loadCities();
  }, []);

  // Fonction pour obtenir l'image d'une ville avec des URLs qui fonctionnent
  const getCityImage = (cityName: string): string => {
    // Utilisation de images.unsplash.com avec des paramètres valides
    const images: Record<string, string> = {
      'Douala': 'https://images.unsplash.com/photo-1580060839134-75f5edde2f11?w=600&h=400&fit=crop',
      'Yaoundé': 'https://images.unsplash.com/photo-1560523159-4a9692d222f1?w=600&h=400&fit=crop',
      'Libreville': 'https://images.unsplash.com/photo-1580060839134-75f5edde2f11?w=600&h=400&fit=crop',
      'Brazzaville': 'https://images.unsplash.com/photo-1560523159-4a9692d222f1?w=600&h=400&fit=crop',
      'Malabo': 'https://images.unsplash.com/photo-1580060839134-75f5edde2f11?w=600&h=400&fit=crop',
    };
    
    // Fallback vers une image par défaut si la ville n'est pas dans la liste
    return images[cityName] || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop';
  };

  // Fallback par défaut avec images qui fonctionnent
  const getDefaultCities = (): City[] => [
    { name: 'Douala', country: 'Cameroun', image: 'https://images.unsplash.com/photo-1580060839134-75f5edde2f11?w=600&h=400&fit=crop', slug: 'douala', count: 0 },
    { name: 'Yaoundé', country: 'Cameroun', image: 'https://images.unsplash.com/photo-1560523159-4a9692d222f1?w=600&h=400&fit=crop', slug: 'yaounde', count: 0 },
    { name: 'Libreville', country: 'Gabon', image: 'https://images.unsplash.com/photo-1580060839134-75f5edde2f11?w=600&h=400&fit=crop', slug: 'libreville', count: 0 },
    { name: 'Brazzaville', country: 'Congo', image: 'https://images.unsplash.com/photo-1560523159-4a9692d222f1?w=600&h=400&fit=crop', slug: 'brazzaville', count: 0 },
    { name: 'Malabo', country: 'Guinée équatoriale', image: 'https://images.unsplash.com/photo-1580060839134-75f5edde2f11?w=600&h=400&fit=crop', slug: 'malabo', count: 0 },
  ];

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
              key={city.slug}
              href={`/search?city=${encodeURIComponent(city.name)}`}
              className="group relative h-64 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Changement important : utilisation de priority={false} et unloader avec blurDataURL */}
              <Image
                src={city.image}
                alt={city.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 20vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority={false}
                loading="lazy"
                unoptimized={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-xl">{city.name}</h3>
                <p className="text-white/80 text-sm">{city.country}</p>
                <p className="text-white/60 text-xs mt-1">{city.count} properties</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}