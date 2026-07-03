'use client';

import { Bell, CheckCheck } from 'lucide-react';
import Link from 'next/link';
import { useNotifications } from '@/contexts/NotificationContext';

export default function NotificationsPanel() {
  const { notifications, loading, markAsRead, markAllAsRead } = useNotifications();

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-full mb-1" />
            <div className="h-2 bg-gray-200 rounded w-1/4" />
          </div>
        ))}
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="text-center py-8">
        <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
        <p className="text-gray-500 text-sm">Aucune notification</p>
      </div>
    );
  }

  return (
    <div>
      {notifications.length > 1 && (
        <button
          onClick={markAllAsRead}
          className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-medium mb-3"
        >
          <CheckCheck size={14} />
          Tout marquer comme lu
        </button>
      )}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {notifications.slice(0, 5).map((notif) => (
          <Link
            key={notif.id}
            href={notif.link || '#'}
            onClick={() => markAsRead(notif.id)}
            className={`block p-3 rounded-xl transition ${
              notif.is_read ? 'bg-gray-50' : 'bg-red-50 border border-red-100'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${notif.is_read ? 'text-gray-700' : 'text-gray-900 font-medium'}`}>
                  {notif.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notif.message}</p>
                <p className="text-[10px] text-gray-400 mt-1">
                  {new Date(notif.created_at).toLocaleDateString()}
                </p>
              </div>
              {!notif.is_read && (
                <span className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0 mt-1" />
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
