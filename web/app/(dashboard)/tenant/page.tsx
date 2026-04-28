'use client';

import { Heart, MessageCircle, Bell, Search } from 'lucide-react';
import Link from 'next/link';

export default function TenantDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Heart className="text-primary-600 mb-2" size={24} />
          <p className="text-2xl font-bold">0</p>
          <p className="text-gray-500 text-sm">Saved Properties</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <MessageCircle className="text-primary-600 mb-2" size={24} />
          <p className="text-2xl font-bold">0</p>
          <p className="text-gray-500 text-sm">Inquiries Sent</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Bell className="text-primary-600 mb-2" size={24} />
          <p className="text-2xl font-bold">0</p>
          <p className="text-gray-500 text-sm">Alerts</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6 text-center text-gray-500">
          <p>No activity yet.</p>
          <Link href="/search" className="text-primary-600 hover:underline mt-2 inline-block">
            Start searching for properties
          </Link>
        </div>
      </div>
    </div>
  );
}