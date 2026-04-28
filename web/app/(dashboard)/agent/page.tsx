'use client';

import Link from 'next/link';
import { PlusCircle, Home, MessageCircle, Eye, TrendingUp } from 'lucide-react';

export default function AgentDashboard() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Agent</h1>
        <Link
          href="/post-property"
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
        >
          <PlusCircle size={18} />
          <span>Post New Property</span>
        </Link>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Home className="text-primary-600 mb-2" size={24} />
          <p className="text-2xl font-bold">0</p>
          <p className="text-gray-500 text-sm">Total Properties</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Eye className="text-primary-600 mb-2" size={24} />
          <p className="text-2xl font-bold">0</p>
          <p className="text-gray-500 text-sm">Total Views</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <MessageCircle className="text-primary-600 mb-2" size={24} />
          <p className="text-2xl font-bold">0</p>
          <p className="text-gray-500 text-sm">Inquiries</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <TrendingUp className="text-primary-600 mb-2" size={24} />
          <p className="text-2xl font-bold">0</p>
          <p className="text-gray-500 text-sm">Conversion Rate</p>
        </div>
      </div>

      {/* Propriétés de l'agent */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">My Properties</h2>
        </div>
        <div className="p-6 text-center text-gray-500">
          <p>No properties yet.</p>
          <Link href="/post-property" className="text-primary-600 hover:underline mt-2 inline-block">
            Post your first property
          </Link>
        </div>
      </div>
    </div>
  );
}