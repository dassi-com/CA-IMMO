import { MonabrisMark } from '@/components/ui/logo';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-monabris-background py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 brand-pattern opacity-40 pointer-events-none" />
      <div className="relative w-full max-w-md">
        <div className="flex justify-center mb-6">
          <MonabrisMark variant="primary" size={56} />
        </div>
        {children}
      </div>
    </div>
  );
}