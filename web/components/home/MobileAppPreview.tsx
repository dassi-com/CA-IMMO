'use client';

import Link from 'next/link';
import { Smartphone, Download, QrCode } from 'lucide-react';

export default function MobileAppPreview() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
          <div className="flex-1 w-full max-w-sm">
            <div className="relative mx-auto" style={{ maxWidth: 280 }}>
              <div className="bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl">
                <div className="bg-white rounded-[2rem] overflow-hidden">
                  <div className="bg-red-600 h-48 flex items-center justify-center">
                    <Smartphone size={64} className="text-white/80" />
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                    <div className="h-2 bg-gray-100 rounded w-2/3"></div>
                    <div className="flex gap-2 mt-3">
                      <div className="h-16 bg-gray-200 rounded-lg flex-1"></div>
                      <div className="h-16 bg-gray-200 rounded-lg flex-1"></div>
                    </div>
                  </div>
                  <div className="h-1 bg-black w-1/3 mx-auto rounded-full mb-1"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Get the ImmoME App
            </h2>
            <p className="text-gray-600 mt-4 max-w-lg mx-auto lg:mx-0">
              Search properties, contact agents, and manage your favorites – all from your mobile device.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
              <Link
                href="#"
                className="flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
              >
                <Download size={24} />
                <div className="text-left">
                  <p className="text-xs text-gray-400">Download on</p>
                  <p className="font-semibold -mt-0.5">App Store</p>
                </div>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
              >
                <Download size={24} />
                <div className="text-left">
                  <p className="text-xs text-gray-400">Get it on</p>
                  <p className="font-semibold -mt-0.5">Google Play</p>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-3 mt-6 justify-center lg:justify-start">
              <QrCode size={20} className="text-gray-400" />
              <span className="text-sm text-gray-500">Scan to download</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
