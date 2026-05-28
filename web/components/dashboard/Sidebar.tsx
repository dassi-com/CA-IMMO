
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Building2,
  Heart,
  Calendar,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Users,
  FileText,
  DollarSign,
  BarChart3,
  Bell,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  role: 'tenant' | 'agent' | 'admin';
  isOpen: boolean;
  onToggle: () => void;
  onClose?: () => void;
}

const navigationItems = {
  tenant: [
    { name: 'Dashboard', href: '/tenant', icon: Home },
    { name: 'Mes favoris', href: '/favorites', icon: Heart },
    { name: 'Visites', href: '/tenant/visits', icon: Calendar },
    { name: 'Messages', href: '/tenant/messages', icon: MessageSquare },
    { name: 'Alertes', href: '/tenant/alerts', icon: Bell },
  ],
  agent: [
    { name: 'Dashboard', href: '/agent', icon: Home },
    { name: 'Mes annonces', href: '/agent/listings', icon: Building2 },
    { name: 'Messages', href: '/agent/messages', icon: MessageSquare },
    { name: 'Statistiques', href: '/agent/stats', icon: BarChart3 },
    { name: 'Paramètres', href: '/settings', icon: Settings },
  ],
  admin: [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Utilisateurs', href: '/admin/users', icon: Users },
    { name: 'Annonces', href: '/admin/listings', icon: FileText },
    { name: 'Paiements', href: '/admin/payments', icon: DollarSign },
    { name: 'Paramètres', href: '/admin/settings', icon: Settings },
  ],
};

export default function Sidebar({ role, isOpen, onToggle, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const items = navigationItems[role];

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen && onClose) onClose();
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={handleMobileMenuToggle}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar for Desktop */}
      <motion.aside
        initial={false}
        animate={{ width: isOpen ? 280 : 80 }}
        className="hidden lg:block fixed left-0 top-0 h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white z-40 shadow-2xl"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <motion.div
              animate={{ justifyContent: isOpen ? 'flex-start' : 'center' }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="font-bold text-xl"
                  >
                    CentralAfricaHomes
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6">
            {items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className={`relative flex items-center gap-3 px-6 py-3 mx-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-red-600 text-white shadow-lg'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <item.icon size={20} />
                    <AnimatePresence>
                      {isOpen && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-sm font-medium"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Section */}
          <div className="p-6 border-t border-white/10">
            <button className="flex items-center gap-3 text-white/70 hover:text-white w-full">
              <LogOut size={20} />
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm"
                  >
                    Déconnexion
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Toggle Button */}
          <button
            onClick={onToggle}
            className="absolute -right-3 top-20 bg-slate-800 rounded-full p-1 shadow-lg"
          >
            {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed left-0 top-0 w-72 h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white z-50 shadow-2xl lg:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                        <Home className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-bold text-xl">CentralAfricaHomes</span>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(false)}>
                      <X size={24} />
                    </button>
                  </div>
                </div>
                <nav className="flex-1 py-6">
                  {items.map((item) => (
                    <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                      <div
                        className={`flex items-center gap-3 px-6 py-3 mx-3 rounded-lg ${
                          pathname === item.href
                            ? 'bg-red-600 text-white'
                            : 'text-white/70 hover:bg-white/10'
                        }`}
                      >
                        <item.icon size={20} />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                    </Link>
                  ))}
                </nav>
                <div className="p-6 border-t border-white/10">
                  <button className="flex items-center gap-3 text-white/70 w-full">
                    <LogOut size={20} />
                    <span className="text-sm">Déconnexion</span>
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}