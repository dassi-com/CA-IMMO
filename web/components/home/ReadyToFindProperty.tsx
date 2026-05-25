'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Home, Key, MapPin } from 'lucide-react';

const features = [
  {
    icon: Home,
    title: 'Buy a home',
    subtitle: 'Buy a Property',
    description: 'A real estate agent can provide you with a clear breakdown of costs so that you can avoid surprise expenses when purchasing your dream home.',
    buttonText: 'Find a local agent',
    buttonLink: '/search',
    image: 'https://images.unsplash.com/photo-1560523159-4a9692d222f1?w=400&q=80',
  },
  {
    icon: Key,
    title: 'Rent a home',
    subtitle: 'Rent a Home',
    description: "We're creating a seamless online experience – from shopping on the largest rental network, to applying, to paying rent.",
    buttonText: 'Find rentals',
    buttonLink: '/search',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80',
  },
  {
    icon: MapPin,
    title: 'Relocate',
    subtitle: 'Relocate to Central Africa',
    description: 'Get comprehensive relocation support including property selection, legal assistance, and local integration services tailored for diaspora buyers.',
    buttonText: 'Start your journey',
    buttonLink: '/search',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80',
  },
];

export default function ReadyToFindProperty() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900">Ready to Find Your Perfect Property?</h2>
          <p className="text-gray-600 mt-2">
            Whether you're looking to buy your dream home, rent a comfortable space, or relocate to Central Africa, we have the perfect solution for you.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="relative h-56">
                <Image src={feature.image} alt={feature.title} fill className="object-cover" />
              </div>
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-primary-600" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="text-gray-500 text-sm mb-2">{feature.subtitle}</p>
                <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                <Link
                  href={feature.buttonLink}
                  className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition"
                >
                  {feature.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}