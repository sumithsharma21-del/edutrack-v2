import { useMemo } from 'react';
import { CalendarCheck, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { demoSubjects, demoAttendance } from '@/services/demoData';
import { cn } from '@/utils/helpers';

export default function AttendancePage() {
  const threshold = 75;

  const subjectAttendance = useMemo(() => {
    return demoSubjects.map(sub => {
      const records = demoAttendance.filter(a => a.subject_id === sub.id);
      const present = records.filter(r => r.status === 'present' || r.status === 'late').length;
      const absent = records.filter(r => r.status === 'absent').length;
      const total = records.length;
      const pct = total > 0 ? (present / total) * 100 : 0;
      const neededFor75 = Math.max(0, Math.ceil((threshold * total - present * 100) / (100 - threshold)));
      const canMiss = Math.max(0, Math.floor((present * 100 - threshold * total) / threshold));
      return { subject: sub, present, absent, total, pct: Math.round(pct), neededFor75, canMiss };
    });
  }, []);

  const overall = useMemo(() => {
    const total = demoAttendance.length;
    const present = demoAttendance.filter(a => a.status === 'present' || a.status === 'late').length;
    return { total, present, absent: total - present, pct: Math.round((present / total) * 100) };
  }, []);

  const chartData = subjectAttendance.map(sa => ({ name: sa.subject.subject_code, attendance: sa.pct }));

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-4 gap-4">
        <div className="rounded-xl p-4 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Overall</p>
          <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{overall.pct}%</p>
        </div>
        <div className="rounded-xl p-4 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Present</p>
          <p className="text-2xl font-bold text-success-600">{overall.present}</p>
        </div>
        <div className="rounded-xl p-4 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Absent</p>
          <p className="text-2xl font-bold text-danger-600">{overall.absent}</p>
        </div>
        <div className="rounded-xl p-4 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Total Classes</p>
          <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{overall.total}</p>
        </div>
      </div>

      <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
        <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Attendance by Subject</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis dataKey="name" stroke="var(--text-tertiary)" fontSize={12} />
            <YAxis stroke="var(--text-tertiary)" fontSize={12} domain={[0, 100]} />
            <Tooltip contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '8px' }} />
            <Bar dataKey="attendance" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        {subjectAttendance.map(sa => (
          <div key={sa.subject.id} className="rounded-xl p-5 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <CalendarCheck className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{sa.subject.subject_name}</p>
                  <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{sa.subject.subject_code}</p>
                </div>
              </div>
              <span className={cn('text-2xl font-bold', sa.pct >= threshold ? 'text-success-600' : 'text-danger-600')}>{sa.pct}%</span>
            </div>
            <div className="w-full rounded-full h-2 mb-3" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              <div className={cn('h-2 rounded-full', sa.pct >= threshold ? 'bg-success-500' : 'bg-danger-500')} style={{ width: `${Math.min(sa.pct, 100)}%` }} />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span style={{ color: 'var(--text-tertiary)' }}>Present: {sa.present} | Absent: {sa.absent} | Total: {sa.total}</span>
              {sa.pct < threshold ? (
                <span className="flex items-center gap-1 text-danger-600">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Attend next {sa.neededFor75} classes to reach {threshold}%
                </span>
              ) : (
                <span className="text-success-600">Can miss {sa.canMiss} more classes</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
