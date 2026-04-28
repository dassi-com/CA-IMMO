import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="bg-primary-600 rounded-lg w-8 h-8 flex items-center justify-center">
        <span className="text-white font-bold text-sm">CA</span>
      </div>
      <div>
        <span className="text-gray-900 font-bold">CentralAfrica<span className="text-primary-è00">Homes</span></span>
        <p className="text-gray-400 text-[10px] leading-tight">Find Your Dream Property</p>
      </div>
    </Link>
  );
}