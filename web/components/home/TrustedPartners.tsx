import Image from 'next/image';

const partners = [
  { name: 'Partner 1', logo: 'https://via.placeholder.com/120x60?text=Partner+1' },
  { name: 'Partner 2', logo: 'https://via.placeholder.com/120x60?text=Partner+2' },
  { name: 'Partner 3', logo: 'https://via.placeholder.com/120x60?text=Partner+3' },
  { name: 'Partner 4', logo: 'https://via.placeholder.com/120x60?text=Partner+4' },
  { name: 'Partner 5', logo: 'https://via.placeholder.com/120x60?text=Partner+5' },
];

export default function TrustedPartners() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="container mx-auto px-6">
        <p className="text-center text-gray-500 text-sm mb-8">Trusted by leading companies</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner, index) => (
            <div key={index} className="relative w-24 h-12 grayscale hover:grayscale-0 transition">
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}