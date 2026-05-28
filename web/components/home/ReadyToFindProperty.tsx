'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Smartphone, Star, Download, QrCode } from 'lucide-react';

export default function ReadyToFindProperty() {
  return (
    <section className="py-16 bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-7xl mx-auto">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
              Get the best property alerts first. Be ahead of the game!
            </h2>
            <p className="text-red-100 mt-4 text-lg max-w-xl">
              Personalized alerts, property valuation, messaging and much more!
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 mt-10 justify-center lg:justify-start">
              <div className="flex items-center gap-3 bg-white/10 rounded-xl px-5 py-3">
                <QrCode size={32} className="text-white" />
                <div className="text-left">
                  <p className="text-sm text-red-200">Scan with your device</p>
                  <p className="text-sm font-semibold">to download our app</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-5 py-3">
                <Star size={20} className="fill-yellow-400 text-yellow-400" />
                <div className="text-left">
                  <p className="text-xl font-bold">4.8</p>
                  <p className="text-xs text-red-200">out of 5 on App Store and Google Play</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
              <Link
                href="#"
                className="inline-flex items-center justify-center gap-2 bg-white text-red-600 font-semibold px-8 py-3 rounded-lg hover:bg-red-50 transition"
              >
                <Download size={18} />
                Download on the App Store
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition"
              >
                <Download size={18} />
                Get it on Google Play
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full max-w-sm">
            <div className="relative flex justify-center">
              <Image
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80"
                alt="Mobile App Preview"
                width={256}
                height={520}
                className="w-64 rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 hidden sm:block">
                <Smartphone size={24} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
