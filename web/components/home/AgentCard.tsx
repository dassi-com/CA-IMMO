'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, Phone, MessageCircle } from 'lucide-react';

interface AgentCardProps {
  name: string;
  agency: string;
  rating: number;
  listingsCount: number;
  avatarUrl: string | null;
  phone: string | null;
}

export default function AgentCard({ name, agency, rating, listingsCount, avatarUrl, phone }: AgentCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 bg-gray-100">
          {avatarUrl && !imgError ? (
            <Image
              src={avatarUrl}
              alt={name}
              width={64}
              height={64}
              className="object-cover w-full h-full"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary-100">
              <span className="text-xl font-bold text-primary-600">
                {name?.charAt(0).toUpperCase() ?? '?'}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-base truncate">{name}</h3>
          <p className="text-gray-500 text-sm truncate">{agency}</p>

          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-gray-700">
                {rating?.toFixed(1) ?? 'N/A'}
              </span>
            </div>
            <span className="text-xs text-gray-400">
              {listingsCount ?? 0} {(listingsCount ?? 0) === 1 ? 'listing' : 'listings'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <a
          href={phone ? `tel:${phone}` : '#'}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition ${
            phone
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Phone size={14} />
          <span>Call</span>
        </a>
        <a
          href={phone ? `https://wa.me/${phone.replace(/[^0-9]/g, '')}` : '#'}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition ${
            phone
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <MessageCircle size={14} />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
