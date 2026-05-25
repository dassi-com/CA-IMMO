'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, SlidersHorizontal, Grid3x3, List, ChevronDown, X } from 'lucide-react';
import PropertyCard from '@/components/properties/PropertyCard';
import { getProperties } from '@/services/propertyService';
import { Property } from '@/types/property';

type SortOption = 'newest' | 'price_asc' | 'price_desc';

function SearchContent() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [filters, setFilters] = useState({
    priceMin: searchParams.get('priceMin') || '',
    priceMax: searchParams.get('priceMax') || '',
    city: searchParams.get('city') || '',
    property_type: searchParams.get('property_type') || '',
  });

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await getProperties();
        setProperties(data);
        setFilteredProperties(data);
      } catch (error) {
        console.error('Error loading properties:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProperties();
  }, []);

  useEffect(() => {
    let result = [...properties];

    if (filters.city) {
      result = result.filter(p => p.city?.toLowerCase().includes(filters.city.toLowerCase()));
    }
    if (filters.property_type) {
      result = result.filter(p => p.property_type === filters.property_type);
    }
    if (filters.priceMin) {
      result = result.filter(p => p.price >= parseInt(filters.priceMin));
    }
    if (filters.priceMax) {
      result = result.filter(p => p.price <= parseInt(filters.priceMax));
    }

    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
    }

    setFilteredProperties(result);
  }, [filters, properties, sortBy]);

  const clearFilters = () => {
    setFilters({
      priceMin: '',
      priceMax: '',
      city: '',
      property_type: '',
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-96"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Search Properties</h1>
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 w-full sm:w-auto"
              >
                <option value="newest">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            <div className="flex bg-white border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Grid3x3 size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition ${viewMode === 'list' ? 'bg-red-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <List size={18} />
              </button>
            </div>

            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm"
            >
              <Filter size={16} />
              Filters
              {Object.values(filters).some(v => v) && (
                <span className="bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">●</span>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                <button onClick={clearFilters} className="text-sm text-red-600 hover:underline">
                  Clear all
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={filters.city}
                    onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                    placeholder="All cities"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                  <select
                    value={filters.property_type}
                    onChange={(e) => setFilters({ ...filters, property_type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-600"
                  >
                    <option value="">All Types</option>
                    <option value="MAISON">House</option>
                    <option value="BUREAU">Office</option>
                    <option value="ENTREPOT">Warehouse</option>
                    <option value="LOCAL_COMMERCIAL">Commercial</option>
                    <option value="TERRAIN">Land</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price Range (FCFA)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={filters.priceMin}
                      onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                      placeholder="Min"
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <input
                      type="number"
                      value={filters.priceMax}
                      onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                      placeholder="Max"
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  {filteredProperties.length} properties found
                </p>
              </div>
            </div>
          </aside>

          {isFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/60" onClick={() => setIsFilterOpen(false)} />
              <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[90vw] bg-white shadow-xl p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-gray-900">Filters</h3>
                  <button onClick={() => setIsFilterOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={24} />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      value={filters.city}
                      onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                    <select
                      value={filters.property_type}
                      onChange={(e) => setFilters({ ...filters, property_type: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    >
                      <option value="">All Types</option>
                      <option value="MAISON">House</option>
                      <option value="BUREAU">Office</option>
                      <option value="ENTREPOT">Warehouse</option>
                      <option value="LOCAL_COMMERCIAL">Commercial</option>
                      <option value="TERRAIN">Land</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                    <div className="flex gap-2">
                      <input type="number" placeholder="Min" value={filters.priceMin} onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })} className="w-1/2 px-3 py-2 border rounded-lg text-sm" />
                      <input type="number" placeholder="Max" value={filters.priceMax} onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })} className="w-1/2 px-3 py-2 border rounded-lg text-sm" />
                    </div>
                  </div>
                </div>
                <button onClick={clearFilters} className="w-full mt-6 text-red-600 py-2 text-sm">Clear all</button>
              </div>
            </div>
          )}

          <div className="flex-1 min-w-0">
            {filteredProperties.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl">
                <p className="text-gray-500">No properties found matching your criteria.</p>
                <button onClick={clearFilters} className="mt-4 text-red-600 hover:underline">Clear filters</button>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-500 mb-4 hidden lg:block">
                  Showing {filteredProperties.length} properties
                </p>
                <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6' : 'grid-cols-1 gap-4'}`}>
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-96"></div>
            ))}
          </div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
