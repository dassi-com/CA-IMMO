import Link from 'next/link';

export default function ReadyToFindProperty() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
          Ready to Find Your Perfect Property?
        </h2>
        <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Whether you&apos;re looking to buy your dream home, rent a comfortable space, or relocate to Central Africa, we have the perfect solution for you.
        </p>
        <Link
          href="/search"
          className="inline-block mt-8 bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-red-50 transition text-base"
        >
          Browse Properties
        </Link>
      </div>
    </section>
  );
}
