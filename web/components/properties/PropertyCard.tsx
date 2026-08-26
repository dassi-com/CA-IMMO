'use client';

import Link from 'next/link';
import { AlertTriangle, BadgeCheck, BedDouble, Building2, Heart, MapPin, Sparkles, SquareDashed } from 'lucide-react';
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
  const listingLabel = isUrgentSale ? 'Urgent sale' : isNew ? 'New listing' : isVerified ? 'Verified listing' : 'Featured listing';

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

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[75%] text-white">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm ${
                isUrgentSale
                  ? 'bg-red-600'
                  : isNew
                    ? 'bg-emerald-600'
                    : isVerified
                      ? 'bg-primary-600'
                      : 'bg-secondary'
              }`}
            >
              {isUrgentSale ? <AlertTriangle size={14} /> : isNew ? <Sparkles size={14} /> : <BadgeCheck size={14} />}
              {listingLabel}
            </span>
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

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-500 text-sm">
            <div className="flex items-center gap-1">
              <Building2 size={14} />
              <span className="capitalize">{property.property_type.toLowerCase().replace('_', ' ')}</span>
            </div>
            {(property.bedrooms ?? property.rooms) && (
              <div className="flex items-center gap-1">
                <BedDouble size={14} />
                <span>{property.bedrooms ?? property.rooms} rooms</span>
              </div>
            )}
            {property.size_m2 > 0 && (
              <div className="flex items-center gap-1">
                <SquareDashed size={14} />
                <span>{property.size_m2} m²</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
