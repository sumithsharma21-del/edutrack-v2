import { Brain } from 'lucide-react';
import { demoPredictions, demoSubjects } from '@/services/demoData';
import { cn, getRiskBg } from '@/utils/helpers';

export default function PredictionsPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        Score predictions based on your academic performance, attendance, and assignment data.
      </p>

      <div className="space-y-4">
        {demoPredictions.map(p => {
          const sub = demoSubjects.find(s => s.id === p.subject_id);
          return (
            <div key={p.id} className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{sub?.subject_name}</h3>
                    <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{sub?.subject_code}</p>
                  </div>
                </div>
                <span className={cn('px-3 py-1 rounded-full text-sm font-medium', getRiskBg(p.risk_level))}>{p.risk_level} risk</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Predicted Score</p>
                  <p className="text-3xl font-bold text-primary-600">{p.predicted_score}%</p>
                </div>
                <div>
                  <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Confidence</p>
                  <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>{p.confidence}%</p>
                </div>
              </div>

              <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Why this prediction?</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{p.explanation}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(p.factors).map(([key, val]) => (
                  <div key={key} className="text-center">
                    <p className="text-xs capitalize" style={{ color: 'var(--text-tertiary)' }}>{key.replace('_', ' ')}</p>
                    <div className="w-full rounded-full h-1.5 mt-1 mb-1" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                      <div className="h-1.5 rounded-full bg-primary-500" style={{ width: `${Math.max(0, Math.min(100, val as number))}%` }} />
                    </div>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{val as number}{key !== 'trend' ? '%' : ''}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
