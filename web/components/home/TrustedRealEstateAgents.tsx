'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, Phone, MessageCircle } from 'lucide-react';
import { adminService } from '@/services/adminService';
import { User } from '@/services/authService';

export default function TrustedRealEstateAgents() {
  const [agents, setAgents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [callAlert, setCallAlert] = useState<{ show: boolean; phone: string }>({ show: false, phone: '' });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await adminService.getFeaturedAgents();
        if (data && data.length > 0) {
          setAgents(data.slice(0, 3));
        } else {
          const allAgents = await adminService.getAgents();
          setAgents(allAgents.slice(0, 3));
        }
      } catch {
        try {
          const allAgents = await adminService.getAgents();
          setAgents(allAgents.slice(0, 3));
        } catch {
          console.error('Erreur chargement agents');
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleCall = (phone: string) => {
    setCallAlert({ show: true, phone });
    setTimeout(() => setCallAlert({ show: false, phone: '' }), 3000);
  };

  const handleWhatsApp = (phone: string) => {
    window.open(`https://wa.me/${phone.replace(/\s/g, '')}`, '_blank');
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 text-center text-gray-400">
          Chargement...
        </div>
      </section>
    );
  }

  if (agents.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Trusted Real Estate Agents</h2>
          <p className="text-gray-600 mt-2">Connect with verified professionals</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {agents.map((agent) => (
            <div key={agent.id} className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                  {agent.avatar_url ? (
                    <Image src={agent.avatar_url} alt={agent.full_name} fill className="rounded-full object-cover" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xl">
                      {agent.full_name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{agent.full_name}</h3>
                  <p className="text-gray-500 text-sm">{agent.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-medium text-sm">Agent certifié</span>
                    <span className="text-gray-400 text-xs">•</span>
                    <span className="text-gray-500 text-xs">{agent.phone || 'Contact disponible'}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleCall(agent.phone)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg text-sm hover:bg-red-700 transition"
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

      {callAlert.show && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up">
          <p>Calling {callAlert.phone}...</p>
          <p className="text-xs text-gray-300 mt-1">This is a demo. Real call functionality coming soon.</p>
        </div>
      )}
    </section>
  );
}
