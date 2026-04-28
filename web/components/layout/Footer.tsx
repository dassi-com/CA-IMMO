import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div><h3 className="text-white text-sm mb-3">Company</h3><ul className="space-y-1"><li><Link href="/about" className="text-xs hover:text-primary-500">About Us</Link></li><li><Link href="/contact" className="text-xs hover:text-primary-500">Contact</Link></li><li><Link href="/careers" className="text-xs hover:text-primary-500">Careers</Link></li></ul></div>
          <div><h3 className="text-white text-sm mb-3">For Buyers</h3><ul className="space-y-1"><li><Link href="/properties" className="text-xs hover:text-primary-500">Browse Properties</Link></li><li><Link href="/buying-guide" className="text-xs hover:text-primary-500">Buying Guide</Link></li><li><Link href="/financing" className="text-xs hover:text-primary-500">Financing</Link></li></ul></div>
          <div><h3 className="text-white text-sm mb-3">For Sellers</h3><ul className="space-y-1"><li><Link href="/list-property" className="text-xs hover:text-primary-500">List Property</Link></li><li><Link href="/selling-guide" className="text-xs hover:text-primary-500">Selling Guide</Link></li><li><Link href="/pricing-tool" className="text-xs hover:text-primary-500">Pricing Tool</Link></li></ul></div>
          <div><h3 className="text-white text-sm mb-3">Resources</h3><ul className="space-y-1"><li><Link href="/blog" className="text-xs hover:text-primary-500">Blog</Link></li><li><Link href="/market-trends" className="text-xs hover:text-primary-500">Market Trends</Link></li><li><Link href="/legal" className="text-xs hover:text-primary-500">Legal</Link></li></ul></div>
        </div>
        <div className="border-t border-gray-800 mt-6 pt-6 text-center text-xs">© 2026 CentralAfricaHomes. All rights reserved.</div>
      </div>
    </footer>
  );
}