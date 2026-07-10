'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Smartphone, Star, Download, QrCode } from 'lucide-react';

export default function ReadyToFindProperty() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 max-w-7xl mx-auto">
          <div className="flex-1 w-full text-center lg:text-left lg:pr-4">
            <Link href="/search" className="block">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight hover:underline">
                Ready to Find Your Perfect Property?
              </h2>
            </Link>
            <p className="text-red-100 mt-3 sm:mt-4 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
              Personalized alerts, property valuation, messaging and much more!
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8 justify-center lg:justify-start">
              <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                <QrCode size={28} className="text-white shrink-0" />
                <div className="text-left">
                  <p className="text-xs sm:text-sm text-red-200">Scan with your device</p>
                  <p className="text-xs sm:text-sm font-semibold">to download our app</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-3">
                <Star size={20} className="fill-yellow-400 text-yellow-400 shrink-0" />
                <div className="text-left">
                  <p className="text-lg sm:text-xl font-bold leading-tight">4.8</p>
                  <p className="text-[10px] sm:text-xs text-red-200 leading-tight">out of 5 on App Store and Google Play</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 justify-center lg:justify-start">
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 bg-white text-red-600 font-semibold px-6 sm:px-8 py-3 rounded-lg hover:bg-red-50 transition text-sm sm:text-base"
              >
                <Download size={18} />
                Browse Properties
              </Link>
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-6 sm:px-8 py-3 rounded-lg hover:bg-white/10 transition text-sm sm:text-base"
              >
                <Download size={18} />
                Search Listings
              </Link>
            </div>
          </div>

          <div className="w-48 sm:w-56 md:w-64 lg:w-72 shrink-0">
            <Link href="/search">
              <div className="relative flex justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80"
                  alt="Mobile App Preview"
                  width={256}
                  height={520}
                  className="w-full h-auto rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-3 -right-3 bg-white/10 backdrop-blur-sm rounded-xl p-2 sm:p-3 border border-white/20 hidden sm:block">
                  <Smartphone size={20} className="text-white" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
