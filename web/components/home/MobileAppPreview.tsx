import Image from 'next/image';
import Link from 'next/link';
import { Smartphone, Download, Star, Shield, Clock } from 'lucide-react';

export default function MobileAppPreview() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm mb-4">
              <Smartphone size={16} />
              <span>Mobile App</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Find Your Dream Home on the Go
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Download our mobile app and browse thousands of properties, schedule viewings, and connect with agents from anywhere.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Download size={20} className="text-green-600" />
                </div>
                <span className="text-gray-700">Easy to use</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star size={20} className="text-yellow-600" />
                </div>
                <span className="text-gray-700">4.8 Rating</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield size={20} className="text-blue-600" />
                </div>
                <span className="text-gray-700">Secure</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Clock size={20} className="text-purple-600" />
                </div>
                <span className="text-gray-700">24/7 Access</span>
              </div>
            </div>
            <div className="flex gap-4 justify-center lg:justify-start">
              <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-900 transition">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.82-3.08.45-1.09-.38-2.09-.39-3.22.01-1.58.56-2.28.27-3.18-.39-2.76-2.02-3.32-5.76-1.83-8.26.96-1.62 2.46-2.52 4.08-2.7 1.6-.18 3.11.88 3.95.88.84 0 2.17-.98 3.75-.81 1.28.06 2.42.6 3.22 1.56-2.96 1.92-2.44 6.25.51 7.38-.89 1.57-2.2 3.08-3.2 3.08zM15.44 5.06c.68-.86 1.08-2.06.96-3.28-1.08.07-2.35.7-3.1 1.61-.68.82-1.15 2-1.03 3.17 1.14.05 2.32-.58 3.17-1.5z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </button>
              <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-900 transition">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.61 11.69L7.75 9.6 12.98 4.37 16.21 3.03 17.44 5.39 15.94 6.89 19.22 10.17 21.03 11.5 18.43 14.1 14.07 11.38 12.31 13.14 15.43 16.26 13.82 17.87 9.9 15.19 4.73 18.39 3.61 16.27 8.5 13.17 6.82 11.49 3.61 11.69z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs">GET IT ON</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-64 h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=500&fit=crop"
                alt="Mobile App Preview"
                fill
                className="object-contain rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}