'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Square, Heart } from 'lucide-react';
import { Property } from '@/types/property';
import { useState } from 'react';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (price: number, currency: string) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M ${currency}`;
    }
    return `${price.toLocaleString()} ${currency}`;
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const imageUrl = property.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80';
  const location = [property.city, property.neighborhood].filter(Boolean).join(', ');

  return (
    <Link href={`/properties/${property.id}`} className="block group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imageUrl}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          <button
            onClick={toggleFavorite}
            className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full hover:bg-white transition"
          >
            <Heart
              size={18}
              className={`transition ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-2">
            <span className="text-xl font-bold text-red-600">
              {formatPrice(property.price, property.currency)}
            </span>
          </div>

          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-red-600 transition">
            {property.title}
          </h3>

          <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
            <MapPin size={14} />
            <span className="line-clamp-1">{location}</span>
          </div>

          <div className="flex items-center gap-4 text-gray-500 text-sm">
            {property.size_m2 > 0 && (
              <div className="flex items-center gap-1">
                <Square size={14} />
                <span>{property.size_m2} m²</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
