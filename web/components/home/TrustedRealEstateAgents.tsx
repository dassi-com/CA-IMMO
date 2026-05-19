'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { api } from '@/services/api';

interface Agent {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  avatar_url?: string;
  rating: number;
  property_count: number;
  is_featured: boolean;
}

export default function TrustedRealEstateAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAgents = async () => {
      try {
        const response = await api.get('/agents/featured');
        setAgents(response.data);
      } catch (error) {
        console.error('Error loading agents:', error);
        setAgents([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadAgents();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
            <div className="h-4 w-64 bg-gray-200 rounded mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (agents.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Trusted Real Estate Agents</h2>
          <p className="text-gray-600 mt-2">Work with the best professionals in Africa</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {agents.map((agent) => (
            <Link
              key={agent.id}
              href={`/agents/${agent.id}`}
              className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition group"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200 relative">
                {agent.avatar_url ? (
                  <Image
                    src={agent.avatar_url}
                    alt={agent.full_name}
                    fill
                    className="object-cover group-hover:scale-105 transition"
                  />
                ) : (
                  <div className="w-full h-full bg-red-100 flex items-center justify-center">
                    <span className="text-red-600 font-bold text-2xl">
                      {agent.full_name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-gray-900">{agent.full_name}</h3>
              <p className="text-sm text-gray-500 mb-2">{agent.property_count} properties</p>
              <div className="flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-600">{agent.rating.toFixed(1)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}