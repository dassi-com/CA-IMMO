'use client';

import { useState, useEffect } from 'react';
import { Home, Building2, ChevronDown } from 'lucide-react';
import { propertyService } from '@/services/propertyService';

interface FilterBarProps {
  activeTab: 'buy' | 'rent';
  onTabChange: (tab: 'buy' | 'rent') => void;
  selectedType: string;
  onTypeChange: (value: string) => void;
  selectedPrice: string;
  onPriceChange: (value: string) => void;
}

const TYPE_LABELS: Record<string, string> = {
  MAISON: 'House',
  BUREAU: 'Office',
  ENTREPOT: 'Warehouse',
  LOCAL_COMMERCIAL: 'Commercial',
  TERRAIN: 'Land',
};

const FALLBACK_TYPE_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'All Types' },
  { value: 'MAISON', label: 'House' },
  { value: 'BUREAU', label: 'Office' },
  { value: 'ENTREPOT', label: 'Warehouse' },
  { value: 'LOCAL_COMMERCIAL', label: 'Commercial' },
  { value: 'TERRAIN', label: 'Land' },
];

const priceOptions = {
  buy: ['Any Price', '0 - 50M XAF', '50M - 100M XAF', '100M - 200M XAF', '200M+ XAF'],
  rent: [
    'Any Price',
    '0 - 100,000 FCFA',
    '100,000 - 500,000 FCFA',
    '500,000 - 1,000,000 FCFA',
    '1,000,000+ FCFA',
  ],
};

export default function FilterBar({
  activeTab,
  onTabChange,
  selectedType,
  onTypeChange,
  selectedPrice,
  onPriceChange,
}: FilterBarProps) {
  const [apiTypes, setApiTypes] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    propertyService
      .getStats()
      .then((stats) => {
        const types = stats.propertyTypes.map((pt) => ({
          value: pt.type,
          label: TYPE_LABELS[pt.type] || pt.type,
        }));
        setApiTypes(types);
      })
      .catch(() => {
        setApiTypes([]);
      });
  }, []);

  const typeOptions =
    apiTypes.length > 0
      ? [{ value: '', label: 'All Types' }, ...apiTypes]
      : FALLBACK_TYPE_OPTIONS;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <div className="flex rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm">
        <button
          onClick={() => onTabChange('buy')}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition ${
            activeTab === 'buy'
              ? 'bg-primary-600 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Home size={16} />
          <span>Buy</span>
        </button>
        <button
          onClick={() => onTabChange('rent')}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition ${
            activeTab === 'rent'
              ? 'bg-primary-600 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Building2 size={16} />
          <span>Rent</span>
        </button>
      </div>

      <div className="relative">
        <select
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
          className="appearance-none px-4 py-2.5 pr-10 bg-white border border-gray-200 rounded-lg text-gray-700 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
        >
          {typeOptions.map((option) => (
            <option key={option.value} value={option.value} className="text-gray-900 bg-white">
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
      </div>

      <div className="relative">
        <select
          value={selectedPrice}
          onChange={(e) => onPriceChange(e.target.value)}
          className="appearance-none px-4 py-2.5 pr-10 bg-white border border-gray-200 rounded-lg text-gray-700 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
        >
          {priceOptions[activeTab].map((option) => (
            <option key={option} value={option} className="text-gray-900 bg-white">
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
      </div>
    </div>
  );
}
