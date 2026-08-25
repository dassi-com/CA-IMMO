'use client';

import Link from 'next/link';
import { BadgeCheck, Building2, Heart, MapPin, Ruler } from 'lucide-react';
import { Property } from '@/types/property';
import { useState } from 'react';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    property.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80'
  );

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

  const location = [property.city, property.neighborhood].filter(Boolean).join(', ');
  const isNew = property.is_new === true;
  const isVerified = property.verified ?? property.status === 'APPROVED';
  const isUrgentSale = property.is_urgent === true && property.listing_type === 'sale';

  return (
    <Link href={`/properties/${property.id}`} className="block group">
      <div className="bg-white rounded-card shadow-card overflow-hidden hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageUrl('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80')}
          />

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[75%]">
            {isVerified && (
              <span className="inline-flex items-center gap-1 bg-white/95 text-success px-2 py-1 rounded-md text-[11px] font-semibold shadow-sm">
                <BadgeCheck size={13} />
                Verified listing
              </span>
            )}
            {isNew && (
              <span className="bg-primary-600 text-white px-2 py-1 rounded-md text-[11px] font-semibold shadow-sm">
                New
              </span>
            )}
            {isUrgentSale && (
              <span className="bg-warning text-white px-2 py-1 rounded-md text-[11px] font-semibold shadow-sm">
                Urgent sale
              </span>
            )}
          </div>

          <button
            onClick={toggleFavorite}
            className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full hover:bg-white transition"
          >
            <Heart
              size={18}
              className={`transition ${isFavorite ? 'fill-primary-600 text-primary-600' : 'text-gray-600'}`}
            />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-2">
            <span className="text-xl font-bold text-primary-600">
              {formatPrice(property.price, property.currency)}
            </span>
          </div>

          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-primary-600 transition">
            {property.title}
          </h3>

          <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-3">
            <MapPin size={14} />
            <span className="line-clamp-1">{location}</span>
          </div>

          <div className="flex items-center gap-4 text-gray-500 text-sm">
            <div className="flex items-center gap-1">
              <Building2 size={14} />
              <span className="capitalize">{property.property_type.toLowerCase().replace('_', ' ')}</span>
            </div>
            {property.size_m2 > 0 && (
              <div className="flex items-center gap-1">
                <Ruler size={14} />
                <span>{property.size_m2} m²</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
