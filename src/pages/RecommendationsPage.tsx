import { Lightbulb, CheckCircle } from 'lucide-react';
import { demoRecommendations, demoSubjects } from '@/services/demoData';
import { cn } from '@/utils/helpers';

const priorityColors: Record<string, string> = {
  critical: 'bg-danger-50 text-danger-600 border-danger-200',
  high: 'bg-warning-50 text-warning-600 border-warning-200',
  medium: 'bg-primary-50 text-primary-600 border-primary-200',
  low: 'bg-success-50 text-success-700 border-success-200',
};

export default function RecommendationsPage() {
  const sorted = [...demoRecommendations].sort((a, b) => {
    const order = { critical: 0, high: 1, medium: 2, low: 3 };
    return (order[a.priority] ?? 4) - (order[b.priority] ?? 4);
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        Personalized recommendations based on your academic performance, attendance, and assignment data.
      </p>

      <div className="space-y-4">
        {sorted.map(r => {
          const sub = r.subject_id ? demoSubjects.find(s => s.id === r.subject_id) : null;
          return (
            <div key={r.id} className={cn('rounded-xl p-5 border-l-4', priorityColors[r.priority] || '')}
              style={{ backgroundColor: 'var(--card-bg)', borderRightColor: 'var(--card-border)', borderTopColor: 'var(--card-border)', borderBottomColor: 'var(--card-border)', borderRightWidth: '1px', borderTopWidth: '1px', borderBottomWidth: '1px' }}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{r.title}</h3>
                </div>
                <span className="text-xs font-medium uppercase px-2 py-0.5 rounded">{r.priority}</span>
              </div>
              {sub && <p className="text-xs mb-2" style={{ color: 'var(--text-tertiary)' }}>{sub.subject_name}</p>}
              <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>{r.recommendation}</p>
              <p className="text-xs italic" style={{ color: 'var(--text-tertiary)' }}>Reason: {r.reason}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
