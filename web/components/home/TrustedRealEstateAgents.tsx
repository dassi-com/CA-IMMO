'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, Phone, MessageCircle } from 'lucide-react';

const agents = [
  {
    name: 'Marie Nkomo',
    agency: 'Central Africa Realty',
    rating: 4.8,
    listings: 45,
    phone: '+237 6 12 34 56 78',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
  },
  {
    name: 'Jean-Paul Essono',
    agency: 'Prime Properties Gabon',
    rating: 4.9,
    listings: 38,
    phone: '+241 7 12 34 56 78',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
  },
  {
    name: 'Aminata Diallo',
    agency: 'Afro Homes',
    rating: 4.7,
    listings: 52,
    phone: '+221 7 12 34 56 78',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
  },
];

export default function TrustedRealEstateAgents() {
  const [callAlert, setCallAlert] = useState<{ show: boolean; phone: string }>({ show: false, phone: '' });

  const handleCall = (phone: string) => {
    setCallAlert({ show: true, phone });
    setTimeout(() => setCallAlert({ show: false, phone: '' }), 3000);
  };

  const handleWhatsApp = (phone: string) => {
    window.open(`https://wa.me/${phone.replace(/\s/g, '')}`, '_blank');
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Trusted Real Estate Agents</h2>
          <p className="text-gray-600 mt-2">Connect with verified professionals</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {agents.map((agent) => (
            <div key={agent.name} className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image src={agent.avatar} alt={agent.name} fill className="rounded-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{agent.name}</h3>
                  <p className="text-gray-500 text-sm">{agent.agency}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-medium text-sm">{agent.rating}</span>
                    <span className="text-gray-400 text-xs">•</span>
                    <span className="text-gray-500 text-xs">{agent.listings} listings</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleCall(agent.phone)}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary-600 text-white py-2 rounded-lg text-sm hover:bg-primary-700 transition"
                >
                  <Phone size={14} />
                  Call
                </button>
                <button
                  onClick={() => handleWhatsApp(agent.phone)}
                  className="flex-1 flex items-center justify-center gap-2 border border-green-500 text-green-500 py-2 rounded-lg text-sm hover:bg-green-50 transition"
                >
                  <MessageCircle size={14} />
                  WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call Alert Popup */}
      {callAlert.show && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up">
          <p>Calling {callAlert.phone}...</p>
          <p className="text-xs text-gray-300 mt-1">This is a demo. Real call functionality coming soon.</p>
        </div>
      )}
    </section>
  );
}