import { Suspense } from 'react';
import { connection } from 'next/server';
import CallbackHandler from './CallbackHandler';

export default async function GoogleCallbackPage() {
  await connection();
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <CallbackHandler />
    </Suspense>
  );
}
