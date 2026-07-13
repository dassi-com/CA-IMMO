'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Search, Home, Key, MapPin } from 'lucide-react';

export default function HeroSection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'relocate'>('buy');
  const [searchText, setSearchText] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const priceOptions = {
    buy: ['Any Price', '0 - 50M XAF', '50M - 100M XAF', '100M - 200M XAF', '200M+ XAF'],
    rent: ['Any Price', '0 - 100,000 FCFA', '100,000 - 500,000 FCFA', '500,000 - 1,000,000 FCFA', '1,000,000+ FCFA'],
    relocate: ['Any Price', 'Negotiable', 'Company Sponsored', 'Government Rate'],
  };

  const typeOptions = {
    buy: ['All Types', 'House', 'Apartments', 'Land', 'Commercial'],
    rent: ['All Types', 'House', 'Apartment', 'Commercial', 'Studio'],
    relocate: ['All Types', 'Corporate Housing', 'Serviced Apartment', 'Family Home'],
  };

  useEffect(() => {
    setSelectedPrice('');
    setSelectedType('');
  }, [activeTab]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchText.trim()) params.set('city', searchText.trim());
    router.push(`/search?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <section className="relative h-[600px] flex items-center justify-center mt-16 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
        alt="Modern city skyline"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            {activeTab === 'buy' && 'Find Your Dream Property'}
            {activeTab === 'rent' && 'Find Your Perfect Rental'}
            {activeTab === 'relocate' && 'Find Your Relocation Home'}
          </h1>
          <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto">
            {activeTab === 'buy' && 'Discover houses, apartments, land plots, and commercial properties across Gabon, Cameroon, Congo, and beyond'}
            {activeTab === 'rent' && 'Find the best rental properties tailored to your needs and budget'}
            {activeTab === 'relocate' && 'Specialized relocation services for expats and corporate moves'}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
          <div className="flex space-x-2 p-4 border-b border-gray-100">
            <button
              onClick={() => setActiveTab('buy')}
              className={`flex items-center space-x-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'buy'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Home size={16} />
              <span>Buy</span>
            </button>
            <button
              onClick={() => setActiveTab('rent')}
              className={`flex items-center space-x-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'rent'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Key size={16} />
              <span>Rent</span>
            </button>
            <button
              onClick={() => setActiveTab('relocate')}
              className={`flex items-center space-x-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'relocate'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <MapPin size={16} />
              <span>Relocate</span>
            </button>
          </div>

          <div className="p-4 space-y-3">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="City, neighborhood..."
                  className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
              </div>
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="px-4 py-3 text-gray-600 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white min-w-[160px]"
              >
                {priceOptions[activeTab].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 text-gray-600 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white min-w-[160px]"
              >
                {typeOptions[activeTab].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSearch}
              className="w-full bg-primary-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-primary-700 transition flex items-center justify-center space-x-2"
            >
              <Search size={16} />
              <span>Search Properties</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
