'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

interface AgentCardProps {
  name: string;
  agency: string;
  rating: number;
  listingsCount: number;
  avatarUrl: string | null;
}

export default function AgentCard({ name, agency, rating, listingsCount, avatarUrl }: AgentCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white rounded-xl p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 bg-gray-100">
        {avatarUrl && !imgError ? (
          <Image
            src={avatarUrl}
            alt={name}
            width={80}
            height={80}
            className="object-cover w-full h-full"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-indigo-100">
            <span className="text-2xl font-bold text-indigo-600">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <h3 className="font-semibold text-gray-900 text-lg">{name}</h3>
      <p className="text-gray-500 text-sm mt-0.5">{agency}</p>
      <div className="flex items-center justify-center gap-1.5 mt-3">
        <Star size={16} className="fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-semibold text-gray-700">
          {rating?.toFixed(1) ?? 'N/A'}
        </span>
      </div>
      <p className="text-xs text-gray-400 mt-1">
        {listingsCount ?? 0} {(listingsCount ?? 0) === 1 ? 'listing' : 'listings'}
      </p>
    </div>
  );
}
