'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PropertyCard from './PropertyCard';
import { FeaturedPropertiesSkeleton } from '@/components/ui/Skeleton';
import { propertyService } from '@/services/propertyService';
import { Property } from '@/types/property';

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await propertyService.getFeatured();
        setProperties(data);
      } catch (error) {
        console.error('Error loading properties:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProperties();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
            <p className="text-gray-600 mt-2">Handpicked properties from trusted agents</p>
          </div>
          <FeaturedPropertiesSkeleton />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 max-w-7xl mx-auto">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
            <p className="text-gray-600 mt-2">Handpicked properties from trusted agents</p>
          </div>
          <Link
            href="/search"
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition"
          >
            View All
            <ArrowRight size={18} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {properties.slice(0, 6).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}