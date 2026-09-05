import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, BarChart3, BookOpen, CalendarCheck, ClipboardList,
  Brain, Lightbulb, Target, FileText, Bell, Settings, User,
  Bot, FolderOpen, LogOut, X, GraduationCap
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/utils/helpers';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/subjects', icon: BookOpen, label: 'Subjects' },
  { to: '/attendance', icon: CalendarCheck, label: 'Attendance' },
  { to: '/assignments', icon: ClipboardList, label: 'Assignments' },
  { to: '/predictions', icon: Brain, label: 'Predictions' },
  { to: '/recommendations', icon: Lightbulb, label: 'Recommendations' },
  { to: '/goals', icon: Target, label: 'Goals' },
  { to: '/ai', icon: Bot, label: 'EduTrack AI' },
  { to: '/files', icon: FolderOpen, label: 'Files' },
  { to: '/reports', icon: FileText, label: 'Reports' },
  { to: '/notifications', icon: Bell, label: 'Notifications' },
];

const bottomItems = [
  { to: '/profile', icon: User, label: 'Profile' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { signOut, profile } = useAuth();
  const location = useLocation();

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 flex flex-col border-r transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
        style={{ backgroundColor: 'var(--sidebar-bg)', borderColor: 'var(--border-color)' }}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-7 h-7 text-primary-600" />
            <span className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>EduTrack</span>
            <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-primary-100 text-primary-700">V2</span>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 rounded hover:bg-surface-100" style={{ color: 'var(--text-secondary)' }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                location.pathname.startsWith(item.to)
                  ? 'bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 shadow-sm border-l-4 border-primary-600 dark:from-primary-950 dark:to-primary-900 dark:text-primary-300'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-3 border-t space-y-1" style={{ borderColor: 'var(--border-color)' }}>
          {bottomItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                location.pathname === item.to
                  ? 'bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 shadow-sm border-l-4 border-primary-600 dark:from-primary-950 dark:to-primary-900 dark:text-primary-300'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
          <button
            onClick={signOut}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-danger-500 hover:bg-danger-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </button>
        </div>

        {profile && (
          <div className="px-4 py-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{profile.full_name}</p>
            <p className="text-xs truncate" style={{ color: 'var(--text-tertiary)' }}>{profile.email}</p>
          </div>
        )}
      </aside>
    </>
  );
}
