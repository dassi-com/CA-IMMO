'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

interface Agent {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  avatar?: string;
  rating?: number;
  listings?: number;
}

export default function TrustedRealEstateAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Remplacer par un vrai appel API quand l'endpoint sera disponible
    // Pour l'instant, on n'affiche pas la section ou on laisse vide
    setLoading(false);
  }, []);

  if (loading || agents.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Trusted Real Estate Agents</h2>
          <p className="text-gray-600 mt-2">Work with the best professionals in Africa</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {agents.map((agent) => (
            <div key={agent.id} className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200 relative">
                {agent.avatar ? (
                  <Image src={agent.avatar} alt={agent.full_name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-red-100 flex items-center justify-center">
                    <span className="text-red-600 font-bold text-2xl">{agent.full_name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-gray-900">{agent.full_name}</h3>
              <p className="text-sm text-gray-500 mb-2">{agent.listings || 0} properties</p>
              <div className="flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-600">{agent.rating || 4.5}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}