'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Home, Building2, Warehouse, Store, Mountain, ArrowRight } from 'lucide-react';
import { propertyService } from '@/services/propertyService';

interface TypeCount {
  type: string;
  label: string;
  count: number;
  icon: any;
  color: string;
}

const typeConfig: Record<string, Omit<TypeCount, 'count'>> = {
  MAISON: { type: 'MAISON', label: 'Houses', icon: Home, color: 'bg-red-100 text-red-600' },
  BUREAU: { type: 'BUREAU', label: 'Offices', icon: Building2, color: 'bg-blue-100 text-blue-600' },
  ENTREPOT: { type: 'ENTREPOT', label: 'Warehouses', icon: Warehouse, color: 'bg-green-100 text-green-600' },
  LOCAL_COMMERCIAL: { type: 'LOCAL_COMMERCIAL', label: 'Commercial', icon: Store, color: 'bg-purple-100 text-purple-600' },
  TERRAIN: { type: 'TERRAIN', label: 'Land', icon: Mountain, color: 'bg-amber-100 text-amber-600' },
};

export default function BrowseByPropertyType() {
  const [types, setTypes] = useState<TypeCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTypes = async () => {
      try {
        const stats = await propertyService.getStats();
        const mapped = stats.propertyTypes
          .map((t) => {
            const config = typeConfig[t.type];
            return config ? { ...config, count: t.count } : null;
          })
          .filter(Boolean) as TypeCount[];
        setTypes(mapped);
      } catch (error) {
        console.error('Error loading property types:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTypes();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Browse by Property Type</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white rounded-xl h-32 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (types.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 max-w-5xl mx-auto">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="text-3xl font-bold text-gray-900">Browse by Property Type</h2>
            <p className="text-gray-600 mt-2">Find exactly what you&apos;re looking for</p>
          </div>
          <Link
            href="/search"
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition"
          >
            View All
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {types.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.type}
                href={`/search?property_type=${item.type}`}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow border border-gray-100 group"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110 ${item.color}`}>
                  <Icon size={28} />
                </div>
                <h3 className="font-semibold text-gray-900">{item.label}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.count} {item.count > 1 ? 'properties' : 'property'}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
