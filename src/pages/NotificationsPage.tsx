import { useState } from 'react';
import { Bell, Check, CheckCheck } from 'lucide-react';
import { demoNotifications } from '@/services/demoData';
import { cn, getRelativeTime } from '@/utils/helpers';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(demoNotifications);

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-success-500';
      case 'warning': return 'bg-warning-500';
      case 'danger': return 'bg-danger-500';
      default: return 'bg-primary-500';
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{unreadCount} unread</p>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700">
            <CheckCheck className="w-4 h-4" /> Mark all read
          </button>
        )}
      </div>

      <div className="space-y-2">
        {notifications.map(n => (
          <div key={n.id}
            className={cn('rounded-xl p-4 border flex items-start gap-3 transition-colors', !n.read && 'border-l-4')}
            style={{
              backgroundColor: n.read ? 'var(--card-bg)' : 'var(--bg-tertiary)',
              borderColor: 'var(--card-border)',
              borderLeftColor: !n.read ? (n.type === 'danger' ? '#ef4444' : n.type === 'warning' ? '#f59e0b' : n.type === 'success' ? '#22c55e' : '#3b82f6') : 'var(--card-border)',
            }}>
            <div className={cn('w-2 h-2 rounded-full mt-2 shrink-0', getTypeColor(n.type))} />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{n.title}</h3>
                <span className="text-xs shrink-0 ml-2" style={{ color: 'var(--text-tertiary)' }}>{getRelativeTime(n.created_at)}</span>
              </div>
              <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>{n.message}</p>
            </div>
            {!n.read && (
              <button onClick={() => markRead(n.id)} className="p-1 rounded hover:bg-[var(--bg-tertiary)]" title="Mark as read">
                <Check className="w-4 h-4 text-primary-600" />
              </button>
            )}
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-20">
          <Bell className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--text-tertiary)' }} />
          <p style={{ color: 'var(--text-secondary)' }}>No notifications yet.</p>
        </div>
      )}
    </div>
  );
}
