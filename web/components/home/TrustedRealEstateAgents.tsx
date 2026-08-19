'use client';

import AgentCard from './AgentCard';

const agents = [
  {
    name: 'Marie Nkomo',
    agency: 'Central Africa Realty',
    rating: 4.8,
    listingsCount: 45,
    phone: '+237 6 12 34 56 78',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
  },
  {
    name: 'Jean-Paul Essono',
    agency: 'Prime Properties Gabon',
    rating: 4.9,
    listingsCount: 38,
    phone: '+241 7 12 34 56 78',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
  },
  {
    name: 'Aminata Diallo',
    agency: 'Afro Homes',
    rating: 4.7,
    listingsCount: 52,
    phone: '+221 7 12 34 56 78',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
  },
];

export default function TrustedRealEstateAgents() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Trusted Real Estate Agents</h2>
          <p className="text-gray-600 mt-2">Our verified agents are here to help you</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {agents.map((agent) => (
            <AgentCard key={agent.name} {...agent} />
          ))}
        </div>
      </div>
    </section>
  );
}