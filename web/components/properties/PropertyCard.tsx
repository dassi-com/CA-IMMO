'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Bed, Bath, Square, Star, Heart } from 'lucide-react';
import { Property } from '@/types/property';
import { useState } from 'react';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (price: number, unit: string) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M ${unit}`;
    }
    return `${price.toLocaleString()} ${unit}`;
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    // TODO: Appeler API pour sauvegarder le favori
  };

  return (
    <Link href={`/properties/${property.id}`} className="block group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={property.images[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80'}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex gap-2">
            {property.verified && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Verified</span>
            )}
            {property.isNew && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">New</span>
            )}
            {property.isUrgent && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Urgent</span>
            )}
          </div>
          
          {/* Icône favori à la place de "For Sale" */}
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

        {/* Contenu */}
        <div className="p-4">
          {/* Prix */}
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-xl font-bold text-primary-600">
                {formatPrice(property.price, property.priceUnit)}
              </span>
              {property.listingType === 'rent' && property.priceUnit.includes('/month') && (
                <span className="text-gray-500 text-sm">/month</span>
              )}
            </div>
            {/* Rating agent */}
            <div className="flex items-center gap-1">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-gray-600">{property.agent?.rating ?? 'N/A'}</span>
            </div>
          </div>

          {/* Titre */}
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-primary-600 transition">
            {property.title}
          </h3>

          {/* Localisation */}
          <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
            <MapPin size={14} />
            <span className="line-clamp-1">{property.neighborhood ? `${property.neighborhood}, ${property.city}` : property.city}</span>
          </div>

          {/* Caractéristiques */}
          <div className="flex items-center gap-4 text-gray-500 text-sm">
            {property.bedrooms > 0 && (
              <div className="flex items-center gap-1">
                <Bed size={14} />
                <span>{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center gap-1">
                <Bath size={14} />
                <span>{property.bathrooms}</span>
              </div>
            )}
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