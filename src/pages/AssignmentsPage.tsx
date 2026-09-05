import { useMemo, useState } from 'react';
import { ClipboardList, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { demoAssignments, demoSubjects } from '@/services/demoData';
import { cn, getStatusColor, formatDate } from '@/utils/helpers';

type Tab = 'all' | 'pending' | 'submitted' | 'graded' | 'overdue';

export default function AssignmentsPage() {
  const [tab, setTab] = useState<Tab>('all');

  const filtered = useMemo(() => {
    if (tab === 'all') return demoAssignments;
    return demoAssignments.filter(a => a.status === tab);
  }, [tab]);

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: demoAssignments.length },
    { key: 'pending', label: 'Pending', count: demoAssignments.filter(a => a.status === 'pending').length },
    { key: 'submitted', label: 'Submitted', count: demoAssignments.filter(a => a.status === 'submitted').length },
    { key: 'graded', label: 'Graded', count: demoAssignments.filter(a => a.status === 'graded').length },
    { key: 'overdue', label: 'Overdue', count: demoAssignments.filter(a => a.status === 'overdue').length },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'overdue': return <AlertTriangle className="w-4 h-4" />;
      case 'graded': return <CheckCircle className="w-4 h-4" />;
      default: return <ClipboardList className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={cn('px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
              tab === t.key ? 'bg-primary-600 text-white' : 'hover:bg-[var(--bg-tertiary)]'
            )}
            style={tab !== t.key ? { color: 'var(--text-secondary)' } : {}}>
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <ClipboardList className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--text-tertiary)' }} />
          <p style={{ color: 'var(--text-secondary)' }}>No {tab} assignments.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(a => {
            const sub = demoSubjects.find(s => s.id === a.subject_id);
            return (
              <div key={a.id} className="rounded-xl p-5 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>{a.title}</h3>
                      <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium inline-flex items-center gap-1', getStatusColor(a.status))}>
                        {getStatusIcon(a.status)} {a.status}
                      </span>
                    </div>
                    <p className="text-sm mb-2" style={{ color: 'var(--text-tertiary)' }}>{sub?.subject_name} | {sub?.subject_code}</p>
                    {a.description && <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{a.description}</p>}
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {a.status === 'graded' ? `${a.marks}/${a.maximum_marks}` : `/${a.maximum_marks}`}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Due: {formatDate(a.due_date)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
