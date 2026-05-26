'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Star, Search } from 'lucide-react';

interface Agent {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  property_count: number;
}

export default function TrustedRealEstateAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAgents = async () => {
      try {
        const { propertyService } = await import('@/services/propertyService');
        const properties = await propertyService.getAll();
        const ownerMap = new Map<string, Agent>();
        properties.forEach((p) => {
          if (p.owner) {
            const existing = ownerMap.get(p.owner.id);
            if (existing) {
              existing.property_count++;
            } else {
              ownerMap.set(p.owner.id, {
                id: p.owner.id,
                full_name: p.owner.full_name,
                email: p.owner.email,
                phone: p.owner.phone,
                property_count: 1,
              });
            }
          }
        });
        const sorted = Array.from(ownerMap.values())
          .sort((a, b) => b.property_count - a.property_count)
          .slice(0, 4);
        setAgents(sorted);
      } catch (error) {
        console.error('Error loading agents:', error);
      } finally {
        setLoading(false);
      }
    };
    loadAgents();
  }, []);

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Trusted Real Estate Agents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl h-64 animate-pulse border border-gray-100"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (agents.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Trusted Real Estate Agents</h2>
          <p className="text-gray-600 mt-2">Our verified agents are here to help you</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-xl p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">
                  {agent.full_name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 text-lg">{agent.full_name}</h3>
              <div className="flex items-center justify-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={14} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {agent.property_count} {agent.property_count > 1 ? 'properties' : 'property'}
              </p>
              <Link
                href={`/search?city=${encodeURIComponent(agent.full_name.split(' ')[0])}`}
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
              >
                <Search size={14} />
                View Properties
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
