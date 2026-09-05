import { Menu, Bell, Search } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export default function Header({ onMenuClick, title }: HeaderProps) {
  const { profile } = useAuth();
  const navigate = useNavigate();

  return (
    <header
      className="h-16 border-b flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30"
      style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
          style={{ color: 'var(--text-secondary)' }}
        >
          <Menu className="w-5 h-5" />
        </button>
        {title && (
          <h1 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{title}</h1>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate('/notifications')}
          className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors relative"
          style={{ color: 'var(--text-secondary)' }}
        >
          <Bell className="w-5 h-5" />
        </button>
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary-700">
              {profile?.full_name?.charAt(0)?.toUpperCase() || 'S'}
            </span>
          </div>
        </button>
      </div>
    </header>
  );
}
