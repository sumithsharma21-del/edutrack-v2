import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, TrendingUp, TrendingDown } from 'lucide-react';
import { demoSubjects, demoMarks, demoAttendance, demoPredictions } from '@/services/demoData';
import { cn, getRiskBg } from '@/utils/helpers';

export default function SubjectsPage() {
  const subjectData = useMemo(() => {
    return demoSubjects.map(sub => {
      const marks = demoMarks.filter(m => m.subject_id === sub.id);
      const avg = marks.length > 0 ? marks.reduce((s, m) => s + (m.marks_obtained / m.maximum_marks) * 100, 0) / marks.length : 0;
      const att = demoAttendance.filter(a => a.subject_id === sub.id);
      const present = att.filter(a => a.status === 'present' || a.status === 'late').length;
      const attPct = att.length > 0 ? (present / att.length) * 100 : 0;
      const prediction = demoPredictions.find(p => p.subject_id === sub.id);
      const sortedMarks = [...marks].sort((a, b) => new Date(a.assessment_date).getTime() - new Date(b.assessment_date).getTime());
      const trend = sortedMarks.length >= 2
        ? ((sortedMarks[sortedMarks.length - 1].marks_obtained / sortedMarks[sortedMarks.length - 1].maximum_marks) -
           (sortedMarks[sortedMarks.length - 2].marks_obtained / sortedMarks[sortedMarks.length - 2].maximum_marks)) * 100
        : 0;
      return { subject: sub, avg: Math.round(avg), attPct: Math.round(attPct), prediction, trend: Math.round(trend) };
    });
  }, []);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>Your Subjects</h2>
        <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{demoSubjects.length} subjects</span>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjectData.map(({ subject, avg, attPct, prediction, trend }) => (
          <Link key={subject.id} to={`/subjects/${subject.id}`}
            className="rounded-xl p-5 border hover:shadow-md transition-all group"
            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-600" />
              </div>
              {prediction && (
                <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', getRiskBg(prediction.risk_level))}>
                  {prediction.risk_level}
                </span>
              )}
            </div>
            <h3 className="font-semibold mb-1 group-hover:text-primary-600 transition-colors" style={{ color: 'var(--text-primary)' }}>
              {subject.subject_name}
            </h3>
            <p className="text-sm mb-3" style={{ color: 'var(--text-tertiary)' }}>{subject.subject_code} | {subject.credits} credits</p>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{avg}%</p>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Average</p>
              </div>
              <div>
                <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{attPct}%</p>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Attendance</p>
              </div>
              <div className="flex items-center gap-1">
                {trend >= 0 ? <TrendingUp className="w-4 h-4 text-success-600" /> : <TrendingDown className="w-4 h-4 text-danger-600" />}
                <span className={cn('text-sm font-medium', trend >= 0 ? 'text-success-600' : 'text-danger-600')}>
                  {trend > 0 ? '+' : ''}{trend}%
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
