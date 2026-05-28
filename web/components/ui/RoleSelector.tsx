// web/components/ui/RoleSelector.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Building2, Users, ChevronDown } from 'lucide-react';

type Role = 'tenant' | 'agent' | 'admin';

export default function RoleSelector() {
  const [role, setRole] = useState<Role>('tenant');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') as Role;
    if (savedRole) setRole(savedRole);
  }, []);

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    localStorage.setItem('userRole', newRole);
    setIsOpen(false);
    
    // Rediriger vers le dashboard correspondant
    router.push(`/${newRole}`);
  };

  const getRoleIcon = () => {
    switch (role) {
      case 'admin': return <Shield size={16} />;
      case 'agent': return <Building2 size={16} />;
      default: return <Users size={16} />;
    }
  };

  const getRoleLabel = () => {
    switch (role) {
      case 'admin': return 'Admin';
      case 'agent': return 'Agent';
      default: return 'Tenant';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition"
      >
        {getRoleIcon()}
        <span>{getRoleLabel()}</span>
        <ChevronDown size={14} />
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl z-50 overflow-hidden">
            <button onClick={() => handleRoleChange('tenant')} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"><Users size={14} /> Tenant</button>
            <button onClick={() => handleRoleChange('agent')} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"><Building2 size={14} /> Agent</button>
            <button onClick={() => handleRoleChange('admin')} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"><Shield size={14} /> Admin</button>
          </div>
        </>
      )}
    </div>
  );
}