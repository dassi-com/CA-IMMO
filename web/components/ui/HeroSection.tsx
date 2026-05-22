'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// @ts-ignore
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Search, Mic, Home, Key, MapPin } from 'lucide-react';

export default function HeroSection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'relocate'>('buy');
  const [searchText, setSearchText] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('Any Price');
  const [selectedType, setSelectedType] = useState('All Types');
  const [isClient, setIsClient] = useState(false);

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript
  } = useSpeechRecognition();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false, language: 'fr-FR' });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    if (transcript) {
      setSearchText(transcript);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchText.trim()) {
      params.set('city', searchText.trim());
    }
    if (selectedPrice && selectedPrice !== 'Any Price') {
      const match = selectedPrice.match(/^(\d+)\s*-\s*(\d+)/);
      if (match) {
        params.set('priceMin', match[1].replace(/\D/g, ''));
        params.set('priceMax', match[2].replace(/\D/g, ''));
      }
    }
    if (selectedType && selectedType !== 'All Types') {
      const typeMap: Record<string, string> = {
        'House': 'MAISON', 'Apartments': 'MAISON', 'Apartment': 'MAISON',
        'Land': 'TERRAIN', 'Commercial': 'LOCAL_COMMERCIAL',
        'Studio': 'MAISON', 'Corporate Housing': 'MAISON',
        'Serviced Apartment': 'MAISON', 'Family Home': 'MAISON',
      };
      const type = typeMap[selectedType] || selectedType.toUpperCase();
      params.set('property_type', type);
    }
    router.push(`/search?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

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

  return (
    <section 
      className="relative bg-cover bg-center bg-no-repeat min-h-[550px] flex items-center mt-16 transition-all duration-500"
      style={{ 
        backgroundImage: activeTab === 'buy' 
          ? "url('https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1600&q=80')"
          : activeTab === 'rent'
          ? "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80')"
          : "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80')"
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative container mx-auto px-4 z-10 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-3">
            {activeTab === 'buy' && 'Find Your Dream Property'}
            {activeTab === 'rent' && 'Find Your Perfect Rental'}
            {activeTab === 'relocate' && 'Find Your Relocation Home'}
          </h1>
          
          <p className="text-center text-white/90 text-sm max-w-2xl mx-auto mb-8">
            {activeTab === 'buy' && 'Discover houses, apartments, land plots, and commercial properties across Gabon, Cameroon, Congo, and beyond'}
            {activeTab === 'rent' && 'Find the best rental properties tailored to your needs and budget'}
            {activeTab === 'relocate' && 'Specialized relocation services for expats and corporate moves'}
          </p>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex justify-center space-x-4 p-5 border-b border-gray-100">
              <button
                onClick={() => { setActiveTab('buy'); setSelectedPrice('Any Price'); setSelectedType('All Types'); }}
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
                onClick={() => { setActiveTab('rent'); setSelectedPrice('Any Price'); setSelectedType('All Types'); }}
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
                onClick={() => { setActiveTab('relocate'); setSelectedPrice('Any Price'); setSelectedType('All Types'); }}
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

            <div className="p-5">
              <div className="relative mb-4">
                  <input
                    type="text"
                    value={listening && isClient ? transcript : searchText}
                    onChange={(e) => !listening && setSearchText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="City, neighborhood, or speak your search..."
                    className="w-full p-3 pl-10 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                
                {/* Microphone fonctionnel - seulement côté client */}
                {isClient && (
                  browserSupportsSpeechRecognition ? (
                    <button
                      onClick={listening ? stopListening : startListening}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 transition ${
                        listening ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-primary-600'
                      }`}
                    >
                      <Mic size={16} />
                    </button>
                  ) : (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 cursor-not-allowed" title="Recherche vocale non supportée">
                      <Mic size={16} />
                    </div>
                  )
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <select
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="px-4 py-3 text-gray-600 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 bg-white"
                >
                  {priceOptions[activeTab].map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>

                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-3 text-gray-600 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 bg-white"
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
      </div>
    </section>
  );
}