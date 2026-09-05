import { Target } from 'lucide-react';
import { demoGoals } from '@/services/demoData';
import { cn, getStatusColor, formatDate } from '@/utils/helpers';

export default function GoalsPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Track your academic goals and progress.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {demoGoals.map(g => {
          const progress = Math.min(100, Math.round((g.current_value / g.target_value) * 100));
          return (
            <div key={g.id} className="rounded-xl p-5 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary-600" />
                  <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>{g.title}</h3>
                </div>
                <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', getStatusColor(g.status))}>
                  {g.status}
                </span>
              </div>
              <p className="text-sm mb-3" style={{ color: 'var(--text-tertiary)' }}>
                {g.category} | Due: {formatDate(g.target_date)}
              </p>
              <div className="flex items-center justify-between text-sm mb-2">
                <span style={{ color: 'var(--text-secondary)' }}>Progress</span>
                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{progress}%</span>
              </div>
              <div className="w-full rounded-full h-2.5" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <div
                  className={cn('h-2.5 rounded-full transition-all', progress >= 80 ? 'bg-success-500' : progress >= 50 ? 'bg-primary-500' : 'bg-warning-500')}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                <span>Current: {g.current_value}</span>
                <span>Target: {g.target_value}</span>
              </div>
            </div>
          );
        })}
      </div>

      {demoGoals.length === 0 && (
        <div className="text-center py-20">
          <Target className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--text-tertiary)' }} />
          <p style={{ color: 'var(--text-secondary)' }}>No goals set yet. Create your first academic goal!</p>
        </div>
      )}
    </div>
  );
}
