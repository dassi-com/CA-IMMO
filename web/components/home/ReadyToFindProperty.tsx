import Image from 'next/image';
import Link from 'next/link';
import { Home, Key, MapPin } from 'lucide-react';

const cards = [
  {
    title: 'Buy a home',
    subtitle: 'Buy a Property',
    description:
      'A real estate agent can provide you with a clear breakdown of costs so that you can avoid surprise expenses when purchasing your dream home.',
    buttonText: 'Find a local agent',
    buttonHref: '/search?purpose=buy',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
    icon: Home,
  },
  {
    title: 'Rent a home',
    subtitle: 'Rent a Home',
    description:
      "We're creating a seamless online experience – from shopping on the largest rental network, to applying, to paying rent.",
    buttonText: 'Find rentals',
    buttonHref: '/search?purpose=rent',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80',
    icon: Key,
  },
  {
    title: 'Relocate',
    subtitle: 'Relocate to Central Africa',
    description:
      'Get comprehensive relocation support including property selection, legal assistance, and local integration services tailored for diaspora buyers.',
    buttonText: 'Start your journey',
    buttonHref: '/search?purpose=relocate',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    icon: MapPin,
  },
];

export default function ReadyToFindProperty() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            Ready to Find Your Perfect Property?
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you&apos;re looking to buy your dream home, rent a comfortable space, or relocate to Central Africa, we have the perfect solution for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <card.icon size={18} className="text-primary-600" />
                  <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
                    {card.title}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{card.subtitle}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {card.description}
                </p>
                <Link
                  href={card.buttonHref}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 transition"
                >
                  {card.buttonText}
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
