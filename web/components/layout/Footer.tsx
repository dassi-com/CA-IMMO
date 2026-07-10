import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div><h3 className="text-white text-sm mb-3">Company</h3><ul className="space-y-1"><li><Link href="/search" className="text-xs hover:text-primary-500">Browse Properties</Link></li><li><Link href="/login" className="text-xs hover:text-primary-500">Sign In</Link></li><li><Link href="/register" className="text-xs hover:text-primary-500">Create Account</Link></li></ul></div>
          <div><h3 className="text-white text-sm mb-3">For Buyers</h3><ul className="space-y-1"><li><Link href="/search" className="text-xs hover:text-primary-500">Browse Properties</Link></li><li><Link href="/favorites" className="text-xs hover:text-primary-500">Saved Properties</Link></li><li><Link href="/search" className="text-xs hover:text-primary-500">Property Search</Link></li></ul></div>
          <div><h3 className="text-white text-sm mb-3">For Sellers</h3><ul className="space-y-1"><li><Link href="/post-property" className="text-xs hover:text-primary-500">List Property</Link></li><li><Link href="/agent/listings" className="text-xs hover:text-primary-500">My Listings</Link></li><li><Link href="/agent/stats" className="text-xs hover:text-primary-500">Statistics</Link></li></ul></div>
          <div><h3 className="text-white text-sm mb-3">Resources</h3><ul className="space-y-1"><li><Link href="/search" className="text-xs hover:text-primary-500">Search</Link></li><li><Link href="/post-property" className="text-xs hover:text-primary-500">Post a Property</Link></li><li><Link href="/register" className="text-xs hover:text-primary-500">Get Started</Link></li></ul></div>
        </div>
        <div className="border-t border-gray-800 mt-6 pt-6 text-center text-xs">© 2026 CentralAfricaHomes. All rights reserved.</div>
      </div>
    </footer>
  );
}