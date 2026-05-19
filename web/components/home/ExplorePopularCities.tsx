'use client';

import Link from 'next/link';
import Image from 'next/image';

const cities = [
  { name: 'Douala', country: 'Cameroun', image: 'https://images.unsplash.com/photo-1580060839134-75f5edde2f11?w=400&h=300&fit=crop', slug: 'douala' },
  { name: 'Yaoundé', country: 'Cameroun', image: 'https://images.unsplash.com/photo-1560523159-4a9692d222f1?w=400&h=300&fit=crop', slug: 'yaounde' },
  { name: 'Libreville', country: 'Gabon', image: 'https://images.unsplash.com/photo-1580060839134-75f5edde2f11?w=400&h=300&fit=crop', slug: 'libreville' },
  { name: 'Brazzaville', country: 'Congo', image: 'https://images.unsplash.com/photo-1560523159-4a9692d222f1?w=400&h=300&fit=crop', slug: 'brazzaville' },
  { name: 'Malabo', country: 'Guinée équatoriale', image: 'https://images.unsplash.com/photo-1580060839134-75f5edde2f11?w=400&h=300&fit=crop', slug: 'malabo' },
];

export default function ExplorePopularCities() {
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
              href={`/search?city=${city.slug}`}
              className="group relative h-64 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={city.image}
                alt={city.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 20vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-xl">{city.name}</h3>
                <p className="text-white/80 text-sm">{city.country}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}