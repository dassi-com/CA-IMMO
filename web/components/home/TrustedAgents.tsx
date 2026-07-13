'use client';

import { useEffect, useState } from 'react';
import AgentCard from './AgentCard';

interface Agent {
  id: string;
  full_name: string;
  agency_name: string;
  rating: number;
  listings_count: number;
  avatar_url: string | null;
}

function AgentSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 animate-pulse">
          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4" />
          <div className="h-5 bg-gray-200 rounded w-2/3 mx-auto mb-1" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-3" />
          <div className="flex justify-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={j} className="w-4 h-4 bg-gray-200 rounded" />
            ))}
          </div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto" />
        </div>
      ))}
    </div>
  );
}

export default function TrustedAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAgents = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/users/featured-agents`
        );
        const result = await response.json();
        if (result.success) {
          setAgents(result.data || []);
        }
      } catch (error) {
        console.error('Failed to load featured agents:', error);
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
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Trusted Real Estate Agents
          </h2>
          <p className="text-gray-500 text-center mb-10">
            Connect with verified professionals
          </p>
          <AgentSkeletonGrid />
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
          <p className="text-gray-500 mt-2">Connect with verified professionals</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              name={agent.full_name}
              agency={agent.agency_name}
              rating={agent.rating}
              listingsCount={agent.listings_count}
              avatarUrl={agent.avatar_url}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
