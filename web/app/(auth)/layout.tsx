import Image from 'next/image';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-monabris-background py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 brand-pattern opacity-40 pointer-events-none" />
      <div className="relative w-full max-w-md">
        <div className="flex justify-center mb-9">
          <div className="relative top-5 h-16 w-16 overflow-hidden rounded-xl shadow-card">
            <Image
              src="/immobn.png"
              alt="Monabris"
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}