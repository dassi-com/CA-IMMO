'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { PropertyTypesSkeleton } from '@/components/ui/Skeleton';
import { propertyService } from '@/services/propertyService';

interface TypeItem {
  key: string;
  label: string;
  backendKey: string | null;
  image: string;
}

const types: TypeItem[] = [
  { key: 'houses', label: 'Houses', backendKey: 'MAISON', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&q=80' },
  { key: 'apartments', label: 'Apartments', backendKey: null, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80' },
  { key: 'land', label: 'Land Plots', backendKey: 'TERRAIN', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80' },
  { key: 'commercial', label: 'Commercial', backendKey: 'LOCAL_COMMERCIAL', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80' },
];

export default function BrowseByPropertyType() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const stats = await propertyService.getStats();
        const map: Record<string, number> = {};
        stats.propertyTypes.forEach((t) => {
          map[t.type] = t.count;
        });
        setCounts(map);
      } catch (error) {
        console.error('Error loading property types:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Browse by Property Type</h2>
          <PropertyTypesSkeleton />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 max-w-5xl mx-auto">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="text-3xl font-bold text-gray-900">Browse by Property Type</h2>
            <p className="text-gray-600 mt-2">Find the perfect property for your needs</p>
          </div>
          <Link
            href="/search"
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition"
          >
            View All
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {types.map((item) => {
            const count = item.backendKey ? (counts[item.backendKey] ?? 0) : 0;
            return (
              <Link
                key={item.key}
                href={item.backendKey ? `/search?property_type=${item.backendKey}` : '/search'}
                className="group bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="h-32 relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-3 text-center">
                  <h3 className="font-semibold text-gray-900 text-sm">{item.label}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {count.toLocaleString()} {count > 1 ? 'listings' : 'listing'}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
