'use client';

import Link from 'next/link';
import { Home, Building2, Warehouse, Store, Trees } from 'lucide-react';

const propertyTypes = [
  { id: 'MAISON', name: 'Villas & Maisons', icon: Home, count: 0, color: 'bg-blue-500' },
  { id: 'BUREAU', name: 'Bureaux', icon: Building2, count: 0, color: 'bg-green-500' },
  { id: 'ENTREPOT', name: 'Entrepôts', icon: Warehouse, count: 0, color: 'bg-orange-500' },
  { id: 'LOCAL_COMMERCIAL', name: 'Locaux Commerciaux', icon: Store, count: 0, color: 'bg-purple-500' },
  { id: 'TERRAIN', name: 'Terrains', icon: Trees, count: 0, color: 'bg-emerald-500' },
];

export default function BrowseByPropertyType() {
  // Les comptes viendront de l'API plus tard
  // Pour l'instant on affiche juste les types

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
              href={`/search?property_type=${type.id}`}
              className="group text-center p-6 rounded-xl border border-gray-200 hover:border-red-200 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-16 h-16 ${type.color} bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <type.icon className={`w-8 h-8 text-${type.color.split('-')[1]}-600`} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{type.name}</h3>
              <p className="text-sm text-gray-500">{type.count} properties</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}