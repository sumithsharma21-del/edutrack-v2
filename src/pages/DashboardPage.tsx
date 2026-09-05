import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, BookOpen, CalendarCheck, ClipboardList, Brain, TrendingUp, AlertTriangle, Target, Bot, ArrowRight, Lightbulb } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { calculateDemoMetrics, demoSubjects, demoMarks, demoPredictions, demoRecommendations } from '@/services/demoData';
import { cn, getRiskBg, formatPercentage } from '@/utils/helpers';

export default function DashboardPage() {
  const metrics = useMemo(() => calculateDemoMetrics(), []);

  const trendData = useMemo(() => {
    const assessments = ['CAT 1', 'CAT 2'];
    return assessments.map(name => {
      const point: Record<string, unknown> = { name };
      demoSubjects.forEach(sub => {
        const mark = demoMarks.find(m => m.subject_id === sub.id && m.assessment_name === name);
        if (mark) point[sub.subject_code] = Math.round((mark.marks_obtained / mark.maximum_marks) * 100);
      });
      return point;
    });
  }, []);

  const subjectAvgs = useMemo(() => {
    return demoSubjects.map(sub => {
      const marks = demoMarks.filter(m => m.subject_id === sub.id);
      const avg = marks.length > 0 ? marks.reduce((s, m) => s + (m.marks_obtained / m.maximum_marks) * 100, 0) / marks.length : 0;
      return { name: sub.subject_code, avg: Math.round(avg) };
    });
  }, []);

  const statCards = [
    { label: 'GPA', value: metrics.gpa.toFixed(2), icon: TrendingUp, color: 'text-primary-600', bg: 'bg-primary-50' },
    { label: 'Average', value: formatPercentage(metrics.average_marks), icon: BarChart3, color: 'text-success-600', bg: 'bg-success-50' },
    { label: 'Attendance', value: formatPercentage(metrics.attendance_percentage), icon: CalendarCheck, color: 'text-warning-600', bg: 'bg-warning-50' },
    { label: 'Subjects', value: metrics.total_subjects.toString(), icon: BookOpen, color: 'text-primary-600', bg: 'bg-primary-50' },
    { label: 'Pending', value: metrics.pending_assignments.toString(), icon: ClipboardList, color: 'text-danger-600', bg: 'bg-danger-50' },
    { label: 'Performance', value: formatPercentage(metrics.performance_score), icon: Brain, color: 'text-primary-600', bg: 'bg-primary-50' },
  ];

  const highPriorityRecs = demoRecommendations.filter(r => r.priority === 'critical' || r.priority === 'high').slice(0, 3);
  const riskPreds = demoPredictions.filter(p => p.risk_level !== 'low').slice(0, 3);
  const colors = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map(card => (
          <div key={card.label} className="rounded-xl p-4 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
            <div className="flex items-center gap-2 mb-2">
              <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', card.bg)}>
                <card.icon className={cn('w-4 h-4', card.color)} />
              </div>
            </div>
            <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{card.value}</p>
            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{card.label}</p>
          </div>
        ))}
      </div>

      {/* Risk Badge */}
      <div className="rounded-xl p-4 border flex items-center justify-between" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
        <div className="flex items-center gap-3">
          <AlertTriangle className={cn('w-5 h-5', metrics.risk_level === 'low' ? 'text-success-600' : metrics.risk_level === 'medium' ? 'text-warning-600' : 'text-danger-600')} />
          <div>
            <p className="font-medium" style={{ color: 'var(--text-primary)' }}>Academic Risk Level</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {metrics.risk_level === 'low' ? 'You are on track. Keep it up!' : metrics.risk_level === 'medium' ? 'Some areas need attention.' : 'Immediate action needed.'}
            </p>
          </div>
        </div>
        <span className={cn('px-3 py-1 rounded-full text-sm font-medium uppercase', getRiskBg(metrics.risk_level))}>
          {metrics.risk_level}
        </span>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Performance Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="name" stroke="var(--text-tertiary)" fontSize={12} />
              <YAxis stroke="var(--text-tertiary)" fontSize={12} domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '8px' }} />
              {demoSubjects.map((sub, i) => (
                <Line key={sub.id} type="monotone" dataKey={sub.subject_code} stroke={colors[i]} strokeWidth={2} dot={{ r: 4 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Subject Averages</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={subjectAvgs}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="name" stroke="var(--text-tertiary)" fontSize={12} />
              <YAxis stroke="var(--text-tertiary)" fontSize={12} domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '8px' }} />
              <Bar dataKey="avg" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Strengths & Weaknesses */}
        <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Academic Insights</h3>
          <div className="space-y-3">
            {metrics.strongest_subject && (
              <div className="flex items-start gap-2">
                <span className="text-success-600 mt-0.5">&#9650;</span>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Strongest</p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{metrics.strongest_subject}</p>
                </div>
              </div>
            )}
            {metrics.weakest_subject && (
              <div className="flex items-start gap-2">
                <span className="text-danger-600 mt-0.5">&#9660;</span>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Needs Work</p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{metrics.weakest_subject}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* At Risk */}
        <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>At Risk Subjects</h3>
            <Link to="/predictions" className="text-sm text-primary-600 hover:text-primary-700">View All</Link>
          </div>
          {riskPreds.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>No subjects at risk.</p>
          ) : (
            <div className="space-y-3">
              {riskPreds.map(p => {
                const sub = demoSubjects.find(s => s.id === p.subject_id);
                return (
                  <div key={p.id} className="flex items-center justify-between">
                    <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{sub?.subject_name}</p>
                    <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', getRiskBg(p.risk_level))}>{p.risk_level}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recommendations */}
        <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Top Recommendations</h3>
            <Link to="/recommendations" className="text-sm text-primary-600 hover:text-primary-700">View All</Link>
          </div>
          <div className="space-y-3">
            {highPriorityRecs.map(r => (
              <div key={r.id} className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-warning-500 mt-0.5 shrink-0" />
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{r.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Widget */}
      <div className="rounded-xl p-6 border bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900" style={{ borderColor: 'var(--card-border)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Ask EduTrack AI</p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Get personalized study advice based on your performance</p>
            </div>
          </div>
          <Link to="/ai" className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors">
            Open AI <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
