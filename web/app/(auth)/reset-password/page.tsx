import { Suspense } from 'react';
import { connection } from 'next/server';
import ResetPasswordForm from './ResetPasswordForm';

export default async function ResetPasswordPage() {
  await connection();
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
