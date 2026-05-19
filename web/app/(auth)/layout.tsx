export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4" style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}