import Link from 'next/link';
import Image from 'next/image';
import { Search, Home, MapPin, type LucideIcon } from 'lucide-react';

const cards: {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  image: string;
  icon: LucideIcon;
}[] = [
  {
    id: 'buy',
    title: 'Buy a home',
    subtitle: 'Buy a Property',
    description: 'A real estate agent can provide you with a clear breakdown of costs so that you can avoid surprise expenses when purchasing your dream home.',
    cta: 'Find a local agent',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
    icon: Home,
  },
  {
    id: 'rent',
    title: 'Rent a home',
    subtitle: 'Rent a Home',
    description: "We're creating a seamless online experience – from shopping on the largest rental network, to applying, to paying rent.",
    cta: 'Find rentals',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
    icon: Search,
  },
  {
    id: 'relocate',
    title: 'Relocate',
    subtitle: 'Relocate to Central Africa',
    description: 'Get comprehensive relocation support including property selection, legal assistance, and local integration services tailored for diaspora buyers.',
    cta: 'Start your journey',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
    icon: MapPin,
  },
];

export default function PropertyBuyRentRelocate() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Ready to Find Your Perfect Property?</h2>
          <p className="text-gray-600 mt-4 text-lg">
            Whether you&apos;re looking to buy your dream home, rent a comfortable space, or relocate to Central Africa, we have the perfect solution for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.id}
                href="/search"
                className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-48 overflow-hidden relative">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={16} className="text-red-500" />
                    <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">{card.title}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{card.subtitle}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">{card.description}</p>
                  <span className="inline-flex items-center gap-2 bg-red-600 text-white font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-red-700 transition">
                    {card.cta}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
