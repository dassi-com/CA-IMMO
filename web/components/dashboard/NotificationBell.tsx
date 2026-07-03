'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';
import Link from 'next/link';
import { useNotifications } from '@/contexts/NotificationContext';
import { useAuth } from '@/contexts/AuthContext';

export default function NotificationBell() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, loading } = useNotifications();
  const { isAuthenticated, user } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  if (!isAuthenticated || !user) return null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-1.5 rounded-full text-gray-600 hover:text-red-600 hover:bg-red-50 transition"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center w-4.5 h-4.5 text-[10px] font-bold text-white bg-red-600 rounded-full min-w-[18px] min-h-[18px]">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800 text-sm">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-red-600 hover:text-red-700 font-medium"
              >
                Tout marquer comme lu
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-gray-400 text-sm">Chargement...</div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-sm">Aucune notification</div>
            ) : (
              notifications.slice(0, 10).map((notif) => (
                <div
                  key={notif.id}
                  className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition cursor-pointer ${
                    !notif.is_read ? 'bg-red-50/50' : ''
                  }`}
                  onClick={() => {
                    markAsRead(notif.id);
                    setOpen(false);
                  }}
                >
                  <Link href={notif.link || '#'} className="block">
                    <p className="text-sm font-medium text-gray-800">{notif.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notif.message}</p>
                    <p className="text-[10px] text-gray-400 mt-1">
                      {new Date(notif.created_at).toLocaleDateString()}
                    </p>
                  </Link>
                </div>
              ))
            )}
          </div>

          {notifications.length > 10 && (
            <Link
              href={user.role === 'ADMIN' ? '/admin' : user.role === 'OWNER' ? '/agent' : '/tenant'}
              className="block text-center text-xs text-red-600 font-medium py-2.5 hover:bg-gray-50 transition"
              onClick={() => setOpen(false)}
            >
              Voir toutes les notifications
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
