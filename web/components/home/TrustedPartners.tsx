'use client';

import { CheckCircle } from 'lucide-react';

const partners = [
  'BGFI Bank', 'Gabonaise Immobilière', 'Afriland First Bank', 'Ecobank',
  'UBA Gabon', 'Société Générale', 'RE/MAX', 'Century 21',
  "Sotheby's International", 'Knight Frank', 'CBRE', 'JLL'
];

const certifications = [
  'ISO 9001 Certified',
  'CEMAC Compliant',
  'Data Protection Certified',
  'Secure Payments'
];

export default function TrustedPartners() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Our Trusted Partners</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            We collaborate with leading local and international organizations to provide you with the best real estate services in Central Africa
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12">
          {partners.map((partner) => (
            <div key={partner} className="bg-gray-50 rounded-lg p-4 text-center hover:shadow-md transition">
              <p className="font-medium text-gray-700">{partner}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-gray-900">Certified & Trusted</h3>
          <p className="text-gray-600 mt-1">Our platform meets international standards for real estate services</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {certifications.map((cert) => (
            <div key={cert} className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
              <CheckCircle size={18} className="text-green-500" />
              <span className="text-gray-700 text-sm">{cert}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}