'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';

export default function HeroSection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'buy' | 'rent'>('buy');
  const [searchText, setSearchText] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchText.trim()) params.set('city', searchText.trim());
    if (selectedType) params.set('property_type', selectedType);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="relative h-[600px] flex items-center justify-center mt-16 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
        alt="Modern city skyline with skyscrapers"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          Find Your Perfect Property
        </h1>

        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
          Discover houses, apartments, land plots, and commercial properties
        </p>

        <div className="space-y-6">
          <SearchBar
            searchText={searchText}
            onSearchChange={setSearchText}
            onSearch={handleSearch}
          />

          <FilterBar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            selectedPrice={selectedPrice}
            onPriceChange={setSelectedPrice}
          />
        </div>
      </div>
    </section>
  );
}
