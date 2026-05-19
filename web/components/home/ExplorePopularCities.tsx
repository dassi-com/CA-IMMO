'use client';

import Image from 'next/image';
import Link from 'next/link';

const cities = [
  { name: 'Libreville', country: 'Gabon', properties: 234, image: 'https://images.unsplash.com/photo-1580060839134-75f5edde2f11?w=400&q=80' },
  { name: 'Douala', country: 'Cameroon', properties: 456, image: 'https://images.unsplash.com/photo-1580060839134-75f5edde2f11?w=400&q=80' },
  { name: 'Yaoundé', country: 'Cameroon', properties: 389, image: 'https://images.unsplash.com/photo-1580060839134-75f5edde2f11?w=400&q=80' },
  { name: 'Brazzaville', country: 'Congo', properties: 178, image: 'https://images.unsplash.com/photo-1580060839134-75f5edde2f11?w=400&q=80' },
  { name: 'Port-Gentil', country: 'Gabon', properties: 145, image: 'https://images.unsplash.com/photo-1580060839134-75f5edde2f11?w=400&q=80' },
  { name: 'Malabo', country: 'Equatorial Guinea', properties: 89, image: 'https://images.unsplash.com/photo-1580060839134-75f5edde2f11?w=400&q=80' },
];

export default function ExplorePopularCities() {
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
              key={city.name}
              href={`/search?city=${encodeURIComponent(city.name)}`}
              className="group relative overflow-hidden rounded-xl aspect-square block shadow-md hover:shadow-xl transition"
            >
              <Image
                src={city.image}
                alt={city.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="text-base font-bold">{city.name}</h3>
                <p className="text-xs text-white/80">{city.country}</p>
                <p className="text-[10px] text-white/70 mt-1">{city.properties} properties</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}