import { Sun, Moon, Monitor, LogOut } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/utils/helpers';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { signOut } = useAuth();

  const themes = [
    { key: 'light' as const, label: 'Light', icon: Sun },
    { key: 'dark' as const, label: 'Dark', icon: Moon },
    { key: 'system' as const, label: 'System', icon: Monitor },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Appearance */}
      <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
        <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Appearance</h3>
        <div className="grid grid-cols-3 gap-3">
          {themes.map(t => (
            <button key={t.key} onClick={() => setTheme(t.key)}
              className={cn('flex flex-col items-center gap-2 p-4 rounded-lg border transition-colors',
                theme === t.key ? 'border-primary-500 bg-primary-50 dark:bg-primary-950' : 'hover:bg-[var(--bg-tertiary)]'
              )}
              style={theme !== t.key ? { borderColor: 'var(--border-color)' } : {}}>
              <t.icon className={cn('w-6 h-6', theme === t.key ? 'text-primary-600' : '')} style={theme !== t.key ? { color: 'var(--text-secondary)' } : {}} />
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Account */}
      <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
        <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Account</h3>
        <button onClick={signOut}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-danger-600 hover:bg-danger-50 transition-colors text-sm font-medium">
          <LogOut className="w-4 h-4" /> Log Out
        </button>
      </div>
    </div>
  );
}
