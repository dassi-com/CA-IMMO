'use client';

import { Search } from 'lucide-react';

interface SearchBarProps {
  searchText: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
}

export default function SearchBar({ searchText, onSearchChange, onSearch }: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onSearch();
  };

  return (
    <div className="flex w-full max-w-2xl mx-auto shadow-lg rounded-lg overflow-hidden">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="City, neighborhood or speak your search..."
          className="w-full pl-12 pr-4 py-4 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-base"
        />
      </div>
      <button
        onClick={onSearch}
        className="px-8 py-4 bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition flex items-center gap-2 text-base"
      >
        <Search size={18} />
        <span className="hidden sm:inline">Search Properties</span>
        <span className="sm:hidden">Search</span>
      </button>
    </div>
  );
}
