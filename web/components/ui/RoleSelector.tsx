// web/components/ui/RoleSelector.tsx
'use client';

import { Building2, Users, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RoleSelector() {
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  if (!isAuthenticated || !user) return null;

  const roleLabel = user.role === 'OWNER' ? 'Agent' : user.role === 'ADMIN' ? 'Admin' : 'Tenant';
  const RoleIcon = user.role === 'OWNER' ? Building2 : user.role === 'ADMIN' ? Building2 : Users;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition"
      >
        <RoleIcon size={16} />
        <span>{roleLabel}</span>
        <ChevronDown size={14} />
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl z-50 overflow-hidden">
            <button
              onClick={() => { setIsOpen(false); router.push(user.role === 'OWNER' ? '/agent' : '/tenant'); }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <Users size={14} /> Mon tableau de bord
            </button>
          </div>
        </>
      )}
    </div>
  );
}