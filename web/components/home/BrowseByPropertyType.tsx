'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Home, Building2, Warehouse, Store, Trees, Briefcase } from 'lucide-react';
import { api } from '@/services/api';

interface PropertyType {
  id: string;
  name: string;
  slug: string;
  icon: string;
  count: number;
  is_active: boolean;
}

// Mapping des icônes
const iconMap: Record<string, any> = {
  'home': Home,
  'building': Building2,
  'warehouse': Warehouse,
  'store': Store,
  'trees': Trees,
  'briefcase': Briefcase,
  'default': Home,
};

export default function BrowseByPropertyType() {
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPropertyTypes = async () => {
      try {
        const response = await api.get('/property-types');
        setPropertyTypes(response.data);
      } catch (error) {
        console.error('Error loading property types:', error);
        setPropertyTypes([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadPropertyTypes();
  }, []);

  const getIcon = (iconName: string) => {
    return iconMap[iconName] || iconMap.default;
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
            <div className="h-4 w-64 bg-gray-200 rounded mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (propertyTypes.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Browse by Property Type</h2>
          <p className="text-gray-600 mt-2">Find exactly what you're looking for</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {propertyTypes.map((type) => {
            const Icon = getIcon(type.icon);
            return (
              <Link
                key={type.id}
                href={`/search?property_type=${type.slug}`}
                className="group text-center p-6 rounded-xl border border-gray-200 hover:border-red-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{type.name}</h3>
                <p className="text-sm text-gray-500">{type.count} properties</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}