'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Home, Building2, Map, Store, ArrowRight, type LucideIcon } from 'lucide-react';
import { PropertyTypesSkeleton } from '@/components/ui/Skeleton';
import { propertyService } from '@/services/propertyService';

interface TypeItem {
  key: string;
  label: string;
  backendKey: string | null;
  icon: LucideIcon;
  color: string;
}

const types: TypeItem[] = [
  { key: 'houses', label: 'Houses', backendKey: 'MAISON', icon: Home, color: 'bg-red-100 text-red-600' },
  { key: 'apartments', label: 'Apartments', backendKey: null, icon: Building2, color: 'bg-blue-100 text-blue-600' },
  { key: 'land', label: 'Land Plots', backendKey: 'TERRAIN', icon: Map, color: 'bg-amber-100 text-amber-600' },
  { key: 'commercial', label: 'Commercial', backendKey: 'LOCAL_COMMERCIAL', icon: Store, color: 'bg-purple-100 text-purple-600' },
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
            const Icon = item.icon;
            const count = item.backendKey ? (counts[item.backendKey] ?? 0) : 0;
            return (
              <Link
                key={item.key}
                href="/search"
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow border border-gray-100 group"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110 ${item.color}`}>
                  <Icon size={28} />
                </div>
                <h3 className="font-semibold text-gray-900">{item.label}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {count.toLocaleString()} {count > 1 ? 'listings' : 'listing'}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
