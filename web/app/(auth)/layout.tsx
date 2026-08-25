import { UserRound } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-monabris-background py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 brand-pattern opacity-40 pointer-events-none" />
      <div className="relative w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary-600 text-white shadow-card">
            <UserRound size={30} strokeWidth={1.8} />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}