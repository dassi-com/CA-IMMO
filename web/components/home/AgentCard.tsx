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
          <div className="w-full h-full flex items-center justify-center bg-primary-100">
            <span className="text-2xl font-bold text-primary-600">
              {name?.charAt(0).toUpperCase() ?? '?'}
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
