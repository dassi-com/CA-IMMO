'use client';

import Link from 'next/link';
import Image from 'next/image';

const propertyTypes = [
  { name: 'Houses', count: 234, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80', type: 'MAISON' },
  { name: 'Apartments', count: 456, image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80', type: 'MAISON' },
  { name: 'Land Plots', count: 178, image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80', type: 'TERRAIN' },
  { name: 'Commercial', count: 89, image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&q=80', type: 'LOCAL_COMMERCIAL' },
];

export default function BrowseByPropertyType() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Browse by Property Type</h2>
          <p className="text-gray-600 mt-2">Find the perfect property for your needs</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {propertyTypes.map((type) => (
            <Link
              key={type.name}
              href={`/search?property_type=${type.type}`}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48">
                <Image src={type.image} alt={type.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-gray-900">{type.name}</h3>
                <p className="text-gray-500 text-sm">{type.count} listings</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}