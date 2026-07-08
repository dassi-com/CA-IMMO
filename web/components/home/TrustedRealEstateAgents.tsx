'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Star, Search } from 'lucide-react';
import { AgentsSkeleton } from '@/components/ui/Skeleton';

interface Agent {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  role: string;
  is_featured: boolean;
}

export default function TrustedRealEstateAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAgents = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/users/featured-agents`);
        const data = await response.json();
        if (data.success) {
          setAgents(data.data || []);
        }
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
          <AgentsSkeleton />
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
              <Link
                href={`/search?owner=${encodeURIComponent(agent.id)}`}
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
