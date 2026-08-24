'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Square, Star, Phone, MessageCircle, Calendar, Mail, Lock, Unlock } from 'lucide-react';
import { getPropertyById } from '@/services/propertyService';
import { Property } from '@/types/property';
import UnlockModal from '@/components/ui/UnlockModal';
import { getPropertyFullLocation, getFormattedPrice } from '@/lib/utils/property';
import { useAuth } from '@/contexts/AuthContext';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactUnlocked, setContactUnlocked] = useState(false);

  const loadProperty = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getPropertyById(id as string);
      if (!data) {
        router.push('/404');
        return;
      }
      setProperty(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to load property');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperty();
  }, [id, router]);

  const handleUnlock = () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
    } else {
      setContactUnlocked(true);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          <div className="skeleton rounded-card h-96 mb-6"></div>
          <div className="h-8 skeleton rounded w-1/3 mb-4"></div>
          <div className="h-4 skeleton rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="h-32 skeleton rounded mb-4"></div>
              <div className="h-32 skeleton rounded"></div>
            </div>
            <div className="h-64 skeleton rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) return null;

  const ownerName = property.owner?.full_name || 'Property Owner';
  const ownerEmail = property.owner?.email || '';
  const ownerPhone = property.owner?.phone || '';
  const imageUrl = (idx: number) => property.images?.[idx]?.image_url || '/images/placeholder.jpg';

  return (
    <>
      <div className="bg-monabris-background min-h-screen pb-12">
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back to Search</span>
          </button>

          <div className="mb-8">
            <div className="relative h-[500px] rounded-card overflow-hidden bg-gray-200 shadow-card mb-4">
              <img
                src={imageUrl(selectedImage)}
                alt={property.title}
                className="w-full h-full object-cover"
                onError={(event) => {
                  event.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80';
                }}
              />
              {property.images && property.images.length > 0 && (
                <div className="absolute bottom-4 right-4 bg-secondary/70 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
                  {selectedImage + 1} / {property.images.length}
                </div>
              )}
            </div>
            {property.images && property.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {property.images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-24 h-20 rounded-card overflow-hidden flex-shrink-0 border-2 transition ${
                      selectedImage === idx ? 'border-primary-600' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img.image_url}
                      alt={`Photo ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(event) => {
                        event.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-card p-6 shadow-card">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-2xl font-bold text-gray-900">{property.title}</h1>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary-600">
                      {getFormattedPrice(property.price, property.currency)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin size={18} />
                  <span>{getPropertyFullLocation(property)}</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-monabris-background rounded-card mb-6">
                  {property.size_m2 > 0 && (
                    <div className="text-center">
                      <Square className="mx-auto text-gray-500 mb-1" size={20} />
                      <div className="font-semibold">{property.size_m2} m²</div>
                      <div className="text-xs text-gray-500">Living Area</div>
                    </div>
                  )}
                </div>

                <div className="border-b border-border mb-4">
                  <div className="flex gap-6">
                    {['Overview', 'Features', 'Neighborhood', 'Investment'].map((tab) => (
                      <button key={tab} className="py-2 text-gray-600 hover:text-primary-600 border-b-2 border-transparent hover:border-primary-600 transition">
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{property.description}</p>
                </div>

                <div className="bg-monabris-background rounded-card p-4 mt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Property Details</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-gray-600">Property Type</span>
                      <span className="text-gray-900 capitalize">{property.property_type}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-gray-600">Added on</span>
                      <span className="text-gray-900">{new Date(property.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-gray-600">Status</span>
                      <span className={`font-medium ${property.status === 'APPROVED' ? 'text-success' : property.status === 'PENDING' ? 'text-warning' : 'text-error'}`}>
                        {property.status}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-gray-600">Surface</span>
                      <span className="text-gray-900">{property.size_m2} m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-card p-6 shadow-card sticky top-24">
                <h3 className="font-semibold text-gray-900 mb-4">Contact Agent</h3>

                {property.owner && (
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-bold text-xl">
                        {ownerName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{ownerName}</p>
                      <p className="text-sm text-gray-600">{ownerEmail}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-3 mb-6">
                  <div className="bg-monabris-background rounded-card p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-gray-500" />
                      <span className="text-gray-600 text-sm">Phone</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${contactUnlocked ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                        {contactUnlocked ? ownerPhone : (ownerPhone ? '••••••••' : 'N/A')}
                      </span>
                      {contactUnlocked ? (
                        <Unlock size={14} className="text-success" />
                      ) : (
                        <Lock size={14} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                  <div className="bg-monabris-background rounded-card p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-gray-500" />
                      <span className="text-gray-600 text-sm">Email</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${contactUnlocked ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                        {contactUnlocked ? ownerEmail : '••••••••'}
                      </span>
                      {contactUnlocked ? (
                        <Unlock size={14} className="text-success" />
                      ) : (
                        <Lock size={14} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {!contactUnlocked && (
                  <p className="text-center text-xs text-gray-400 mb-4">
                    Sign in and pay 100 FCFA to unlock contact information
                  </p>
                )}

                <div className="space-y-2">
                  <button
                    onClick={handleUnlock}
                    className="w-full bg-primary-600 text-white py-2.5 rounded-card font-medium hover:bg-primary-700 shadow-card transition flex items-center justify-center gap-2"
                  >
                    <Unlock size={16} />
                    Unlock to Call
                  </button>
                  <button
                    onClick={handleUnlock}
                    className="w-full border border-primary-600 text-primary-600 py-2.5 rounded-card font-medium hover:bg-primary-50 transition flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={16} />
                    Unlock for WhatsApp
                  </button>
                  <button
                    onClick={handleUnlock}
                    className="w-full border border-border text-gray-700 py-2.5 rounded-card font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
                  >
                    <Calendar size={16} />
                    Unlock to Schedule
                  </button>
                  <button
                    onClick={handleUnlock}
                    className="w-full border border-border text-gray-700 py-2.5 rounded-card font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
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
