'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, MapPin, Bed, Bath, Square, Star, Phone, MessageCircle, Calendar, Mail, Lock, Unlock } from 'lucide-react';
import { getPropertyById } from '@/services/propertyService';
import { Property } from '@/types/property';
import UnlockModal from '@/components/ui/UnlockModal';
import { getPropertyFullLocation, getFormattedPrice } from '@/lib/utils/property';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadProperty = async () => {
      if (!id) return;
      try {
        const data = await getPropertyById(id as string);
        if (!data) {
          router.push('/404');
          return;
        }
        setProperty(data);
      } catch (error) {
        console.error('Error loading property:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProperty();
  }, [id, router]);

  const handleUnlock = () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
    } else {
      console.log('Contact unlocked');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-xl mb-6"></div>
          <div className="h-8 bg-gray-200 w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) return null;

  return (
    <>
      <div className="bg-gray-50 min-h-screen pb-12">
        <div className="container mx-auto px-4 py-6">
          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back to Search</span>
          </button>

          {/* Image Gallery */}
          <div className="mb-8">
            <div className="relative h-[500px] rounded-xl overflow-hidden bg-gray-200 mb-4">
              <Image
                src={property.images?.[selectedImage] || '/images/placeholder.jpg'}
                alt={property.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
              {property.images && property.images.length > 0 && (
                <div className="absolute bottom-4 right-4 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
                  {selectedImage + 1} / {property.images.length}
                </div>
              )}
            </div>
            {/* Thumbnails */}
            {property.images && property.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-24 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition ${
                      selectedImage === idx ? 'border-red-600' : 'border-transparent'
                    }`}
                  >
                    <Image src={img} alt={`Photo ${idx + 1}`} fill className="object-cover" sizes="96px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Contenu principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne gauche - Description */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-2xl font-bold text-gray-900">{property.title}</h1>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-red-600">
                      {getFormattedPrice(property.price, property.currency)}
                    </span>
                    {property.listingType === 'rent' && (
                      <span className="text-gray-500 text-sm block">/month</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-gray-500 mb-4">
                  <MapPin size={18} />
                  <span>{getPropertyFullLocation(property)}</span>
                </div>
                
                {/* Badges */}
                <div className="flex gap-2 mb-6">
                  {property.verified && (
                    <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">Verified Listing</span>
                  )}
                  {property.isNew && (
                    <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">New</span>
                  )}
                  {property.isUrgent && (
                    <span className="bg-red-100 text-red-700 text-sm px-3 py-1 rounded-full">Urgent Sale</span>
                  )}
                </div>

                {/* Caractéristiques principales */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg mb-6">
                  {property.bedrooms > 0 && (
                    <div className="text-center">
                      <Bed className="mx-auto text-gray-500 mb-1" size={20} />
                      <div className="font-semibold">{property.bedrooms}</div>
                      <div className="text-xs text-gray-500">Bedrooms</div>
                    </div>
                  )}
                  {property.bathrooms > 0 && (
                    <div className="text-center">
                      <Bath className="mx-auto text-gray-500 mb-1" size={20} />
                      <div className="font-semibold">{property.bathrooms}</div>
                      <div className="text-xs text-gray-500">Bathrooms</div>
                    </div>
                  )}
                  {property.size_m2 > 0 && (
                    <div className="text-center">
                      <Square className="mx-auto text-gray-500 mb-1" size={20} />
                      <div className="font-semibold">{property.size_m2} m²</div>
                      <div className="text-xs text-gray-500">Living Area</div>
                    </div>
                  )}
                  {property.area && property.area > 0 && (
                    <div className="text-center">
                      <Square className="mx-auto text-gray-500 mb-1" size={20} />
                      <div className="font-semibold">{property.area} m²</div>
                      <div className="text-xs text-gray-500">Land Size</div>
                    </div>
                  )}
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-4">
                  <div className="flex gap-6">
                    {['Overview', 'Features', 'Neighborhood', 'Investment'].map((tab) => (
                      <button key={tab} className="py-2 text-gray-600 hover:text-red-600 border-b-2 border-transparent hover:border-red-600 transition">
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{property.description}</p>
                </div>

                {/* Features list */}
                {property.features && property.features.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {property.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-600 text-sm">
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Property details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Property Details</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-500">Property Type</span>
                      <span className="text-gray-900 capitalize">{property.property_type}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-500">Listing Type</span>
                      <span className="text-gray-900 capitalize">{property.listingType}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-500">Added on</span>
                      <span className="text-gray-900">{new Date(property.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne droite - Carte agent */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
                <h3 className="font-semibold text-gray-900 mb-4">Contact Agent</h3>
                
                {/* Agent info */}
                {property.agent ? (
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold text-xl">
                        {property.agent.full_name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{property.agent.full_name}</p>
                      <p className="text-sm text-gray-500">{property.agent.email}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium">4.8</span>
                        <span className="text-xs text-gray-400">(12 listings)</span>
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* Contact details (locked) */}
                <div className="space-y-3 mb-6">
                  <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-gray-500" />
                      <span className="text-gray-600 text-sm">Phone</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm">••••••••</span>
                      <Lock size={14} className="text-gray-400" />
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-gray-500" />
                      <span className="text-gray-600 text-sm">Email</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm">••••••••</span>
                      <Lock size={14} className="text-gray-400" />
                    </div>
                  </div>
                </div>

                <p className="text-center text-xs text-gray-400 mb-4">
                  Sign in and pay 100 FCFA to unlock contact information
                </p>

                {/* Action buttons */}
                <div className="space-y-2">
                  <button
                    onClick={handleUnlock}
                    className="w-full bg-red-600 text-white py-2.5 rounded-lg font-medium hover:bg-red-700 transition flex items-center justify-center gap-2"
                  >
                    <Unlock size={16} />
                    Unlock to Call
                  </button>
                  <button
                    onClick={handleUnlock}
                    className="w-full border border-red-600 text-red-600 py-2.5 rounded-lg font-medium hover:bg-red-50 transition flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={16} />
                    Unlock for WhatsApp
                  </button>
                  <button
                    onClick={handleUnlock}
                    className="w-full border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
                  >
                    <Calendar size={16} />
                    Unlock to Schedule
                  </button>
                  <button
                    onClick={handleUnlock}
                    className="w-full border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
                  >
                    <Mail size={16} />
                    Unlock to Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UnlockModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}