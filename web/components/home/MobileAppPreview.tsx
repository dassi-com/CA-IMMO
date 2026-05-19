'use client';

import Image from 'next/image';
import Link from 'next/link';
import { QrCode, Star, Smartphone } from 'lucide-react';

export default function MobileAppPreview() {
  return (
    <section className="py-16 bg-primary-600">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Content */}
          <div className="flex-1 text-white text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-4">Get the best property alerts first.</h2>
            <p className="text-white/90 text-lg mb-4">Be ahead of the game!</p>
            <p className="text-white/80 mb-6">Personalized alerts, property valuation, messaging and much more!</p>
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <QrCode size={40} className="text-white" />
              <span className="text-white/90">Scan with your device 📱 to download our app</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star size={18} className="fill-yellow-400 text-yellow-400" />
                <Star size={18} className="fill-yellow-400 text-yellow-400" />
                <Star size={18} className="fill-yellow-400 text-yellow-400" />
                <Star size={18} className="fill-yellow-400 text-yellow-400" />
                <Star size={18} className="fill-yellow-400 text-yellow-400" />
              </div>
              <span className="text-white font-semibold">4.8 out of 5</span>
              <span className="text-white/80">on App Store and Google Play</span>
            </div>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link href="#" className="bg-black text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-900 transition">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.02.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </Link>
              <Link href="#" className="bg-black text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-900 transition">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.092 8.635-8.394zm.014-1.414l-8.635-8.394 10.937 6.092-2.302 2.302z"/></svg>
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Right Image - Mobile App Preview */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-64 h-96 bg-black rounded-3xl shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-primary-400 to-primary-800 flex items-center justify-center">
                <Smartphone size={80} className="text-white/50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}