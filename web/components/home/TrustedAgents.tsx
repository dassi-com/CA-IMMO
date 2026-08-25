import AgentCard from './AgentCard';

interface Agent {
  id: string;
  full_name: string;
  agency_name: string;
  rating: number;
  listings_count: number;
  avatar_url: string | null;
  phone: string | null;
}

const agents: Agent[] = [
  {
    id: 'demo-aminata',
    full_name: 'Aminata Diallo',
    agency_name: 'Afro Homes',
    rating: 4.7,
    listings_count: 52,
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    phone: '+241 77 123 456',
  },
  {
    id: 'demo-jean',
    full_name: 'Jean Mbarga',
    agency_name: 'Immo Douala',
    rating: 4.5,
    listings_count: 38,
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    phone: '+237 6 77 88 99 00',
  },
  {
    id: 'demo-claire',
    full_name: 'Claire Ngo',
    agency_name: "Terres d'Afrique",
    rating: 4.8,
    listings_count: 27,
    avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
    phone: '+237 6 99 88 77 66',
  },
  {
    id: 'demo-paul',
    full_name: 'Paul Mampouya',
    agency_name: 'Congo Immo Pro',
    rating: 4.6,
    listings_count: 31,
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
    phone: '+242 06 123 4567',
  },
  {
    id: 'demo-marie',
    full_name: 'Marie Lemba',
    agency_name: 'Gabon Beach Realty',
    rating: 4.9,
    listings_count: 19,
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
    phone: '+241 66 123 456',
  },
  {
    id: 'demo-eric',
    full_name: 'Éric Kamga',
    agency_name: 'Yaoundé Immo Plus',
    rating: 4.4,
    listings_count: 45,
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
    phone: '+237 6 55 44 33 22',
  },
];

export default function TrustedAgents() {
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
              phone={agent.phone}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
