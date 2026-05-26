'use client';

import Link from 'next/link';
import { Search, Home, Shield, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Search Properties',
    description: 'Browse through our extensive collection of properties with advanced filtering options.',
  },
  {
    icon: Home,
    title: 'Virtual Tours',
    description: 'Explore properties from the comfort of your home with immersive virtual tours.',
  },
  {
    icon: Shield,
    title: 'Secure Process',
    description: 'End-to-end encrypted transactions with verified listings and trusted agents.',
  },
  {
    icon: CheckCircle,
    title: 'Expert Support',
    description: 'Dedicated real estate experts available 24/7 to guide you through every step.',
  },
];

export default function ReadyToFindProperty() {
  return (
    <section className="py-16 bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-7xl mx-auto">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
              Ready to Find Your Perfect Property?
            </h2>
            <p className="text-red-100 mt-4 text-lg max-w-lg mx-auto lg:mx-0">
              Join thousands of satisfied clients who found their dream property through ImmoME.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 max-w-xl mx-auto lg:mx-0">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex gap-3 text-left">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                      <Icon size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{feature.title}</h4>
                      <p className="text-red-100 text-sm mt-0.5">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center lg:justify-start">
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 bg-white text-red-600 font-semibold px-8 py-3 rounded-lg hover:bg-red-50 transition"
              >
                <Search size={18} />
                Get Started
              </Link>
              <Link
                href="/post-property"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition"
              >
                List Your Property
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full max-w-lg">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"
                alt="Modern living room"
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-white text-gray-900 rounded-xl p-4 shadow-lg hidden sm:block">
                <p className="text-2xl font-bold text-red-600">500+</p>
                <p className="text-sm text-gray-600">Properties Sold</p>
              </div>
              <div className="absolute -top-4 -right-4 bg-white text-gray-900 rounded-xl p-4 shadow-lg hidden sm:block">
                <p className="text-2xl font-bold text-red-600">98%</p>
                <p className="text-sm text-gray-600">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
