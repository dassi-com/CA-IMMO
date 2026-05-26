import { Suspense } from 'react';
import { connection } from 'next/server';
import SearchContent from './SearchContent';

export default async function SearchPage() {
  await connection();
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-96"></div>
            ))}
          </div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
