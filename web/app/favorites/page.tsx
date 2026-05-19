'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Heart, 
  Trash2, 
  Bell, 
  LayoutGrid,
  MapPin,
  Bed,
  Bath,
  Square,
  ArrowUpDown,
  X,
  CheckCircle2,
} from 'lucide-react';
import { favoriteService } from '@/services/favoriteService';
import { propertyService, Property } from '@/services/propertyService';

// Type adapté pour l'affichage
interface FavoriteDisplay {
  id: string;
  title: string;
  location: string;
  price: number;
  priceType: "sale" | "rent";
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  isVerified?: boolean;
  isNew?: boolean;
  isUrgent?: boolean;
  savedAt: Date;
}

type SortOption = "recent" | "price-asc" | "price-desc";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<FavoriteDisplay | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Charger les favoris depuis l'API
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    setIsLoading(true);
    try {
      const favoriteProperties = await favoriteService.getFavorites();
      
      // Convertir les propriétés au format d'affichage
      const formattedFavorites: FavoriteDisplay[] = favoriteProperties.map((prop: Property) => ({
        id: prop.id,
        title: prop.title,
        location: `${prop.neighborhood}, ${prop.city}`,
        price: prop.price,
        priceType: prop.property_type === 'MAISON' || prop.property_type === 'TERRAIN' ? 'sale' : 'rent',
        bedrooms: 0, // À adapter selon ton schéma
        bathrooms: 0, // À adapter selon ton schéma
        area: prop.size_m2,
        image: prop.images?.[0] || '/placeholder.jpg',
        isVerified: false,
        isNew: false,
        isUrgent: false,
        savedAt: new Date(prop.created_at),
      }));
      
      setFavorites(formattedFavorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFavorite = async (id: string) => {
    try {
      await favoriteService.removeFromFavorites(id);
      setFavorites(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const getSortedFavorites = () => {
    const sorted = [...favorites];
    switch (sortBy) {
      case "recent":
        return sorted.sort((a, b) => b.savedAt.getTime() - a.savedAt.getTime());
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return sorted;
    }
  };

  const formatPrice = (price: number, type: "sale" | "rent") => {
    if (price >= 1_000_000) {
      return `${(price / 1_000_000).toFixed(1)}M XAF`;
    }
    if (price >= 1_000) {
      return `${(price / 1000).toFixed(0)}K XAF`;
    }
    return `${price} XAF`;
  };

  const sortedFavorites = getSortedFavorites();

  // Affichage du chargement
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
              <Heart className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <div className="h-7 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-24 bg-gray-200 rounded mt-1 animate-pulse"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl h-96 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header avec icône cœur */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Favorites</h1>
            <p className="text-gray-500 text-sm">{favorites.length} saved properties</p>
          </div>
        </div>

        {/* Barre de tri et vue */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="recent">Sort by: Recently Added</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <ArrowUpDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <button
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <LayoutGrid className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Liste des favoris */}
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-gray-500 mb-6">Start saving properties you love</p>
            <Link href="/search" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
              Browse Properties
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedFavorites.map((property) => (
                <div key={property.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
                  <Link href={`/properties/${property.id}`}>
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={property.image}
                        alt={property.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        className="object-cover hover:scale-105 transition duration-300"
                      />
                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex gap-1">
                        {property.isVerified && (
                          <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">Verified</span>
                        )}
                        {property.isNew && (
                          <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">New</span>
                        )}
                        {property.isUrgent && (
                          <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">Urgent</span>
                        )}
                      </div>
                    </div>
                  </Link>

                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <Link href={`/properties/${property.id}`}>
                        <h3 className="font-semibold text-gray-900 hover:text-blue-500 line-clamp-1">
                          {property.title}
                        </h3>
                      </Link>
                      <button 
                        onClick={() => removeFavorite(property.id)} 
                        className="p-1 hover:bg-red-50 rounded transition"
                      >
                        <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{property.location}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-600">
                      {property.bedrooms > 0 && (
                        <span className="flex items-center gap-1">
                          <Bed className="w-3 h-3" /> {property.bedrooms}
                        </span>
                      )}
                      {property.bathrooms > 0 && (
                        <span className="flex items-center gap-1">
                          <Bath className="w-3 h-3" /> {property.bathrooms}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Square className="w-3 h-3" /> {property.area}m²
                      </span>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <span className="text-lg font-bold text-blue-600">
                        {formatPrice(property.price, property.priceType)}
                        {property.priceType === "rent" && <span className="text-sm font-normal">/month</span>}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedProperty(property);
                          setShowAlertModal(true);
                        }}
                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-500 transition"
                      >
                        <Bell className="w-3 h-3" />
                        Alert
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Banner avec fond bleu ciel transparent et icônes check */}
            <div className="mt-10 bg-gradient-to-r from-sky-50/80 to-blue-50/80 backdrop-blur-sm rounded-2xl p-6 border border-sky-200 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-5 h-5 text-sky-500" />
                    <h3 className="font-semibold text-gray-800 text-lg">Never lose track of properties you love</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    Your favorites are saved to your account and synced across all devices. You'll also receive 
                    notifications when prices change or when similar properties become available.
                  </p>
                  
                  {/* Options avec icônes check */}
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-sm text-gray-700 font-medium">Price Alerts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-sm text-gray-700 font-medium">Similar Listings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-sm text-gray-700 font-medium">Market Updates</span>
                    </div>
                  </div>
                </div>
                
                <button className="bg-sky-500 text-white px-5 py-2.5 rounded-xl hover:bg-sky-600 transition shadow-sm whitespace-nowrap font-medium text-sm">
                  Manage Alerts
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modal d'alerte */}
      {showAlertModal && selectedProperty && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold text-gray-900">Set Price Alert</h3>
              <button onClick={() => setShowAlertModal(false)} className="p-1 hover:bg-gray-100 rounded transition">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-gray-600 text-sm mb-4">
                Get notified when <span className="font-medium text-gray-900">"{selectedProperty.title}"</span> changes price
              </p>
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-sm cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-sky-500 focus:ring-sky-400" defaultChecked />
                  <span className="text-gray-700">Price drop notification</span>
                </label>
                <label className="flex items-center gap-3 text-sm cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-sky-500 focus:ring-sky-400" />
                  <span className="text-gray-700">Similar properties in same area</span>
                </label>
                <label className="flex items-center gap-3 text-sm cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-sky-500 focus:ring-sky-400" />
                  <span className="text-gray-700">Weekly market updates</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 p-4 border-t">
              <button 
                onClick={() => setShowAlertModal(false)} 
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowAlertModal(false)} 
                className="flex-1 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition"
              >
                Set Alert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}