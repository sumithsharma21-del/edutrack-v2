import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { demoSubjects, demoMarks, demoAttendance, demoAssignments, calculateDemoMetrics } from '@/services/demoData';
import { TrendingUp, TrendingDown, Award, AlertTriangle } from 'lucide-react';

export default function AnalyticsPage() {
  const metrics = useMemo(() => calculateDemoMetrics(), []);

  const subjectAvgs = useMemo(() => {
    return demoSubjects.map(sub => {
      const marks = demoMarks.filter(m => m.subject_id === sub.id);
      const avg = marks.length > 0 ? marks.reduce((s, m) => s + (m.marks_obtained / m.maximum_marks) * 100, 0) / marks.length : 0;
      return { name: sub.subject_code, fullName: sub.subject_name, avg: Math.round(avg) };
    }).sort((a, b) => b.avg - a.avg);
  }, []);

  const trendData = useMemo(() => {
    const assessments = ['CAT 1', 'CAT 2'];
    return assessments.map(name => {
      const marks = demoMarks.filter(m => m.assessment_name === name);
      const avg = marks.length > 0 ? marks.reduce((s, m) => s + (m.marks_obtained / m.maximum_marks) * 100, 0) / marks.length : 0;
      return { name, average: Math.round(avg) };
    });
  }, []);

  const distributionData = useMemo(() => {
    const ranges = [
      { name: '90-100', min: 90, max: 100, count: 0, color: '#22c55e' },
      { name: '80-89', min: 80, max: 89, count: 0, color: '#3b82f6' },
      { name: '70-79', min: 70, max: 79, count: 0, color: '#f59e0b' },
      { name: '60-69', min: 60, max: 69, count: 0, color: '#f97316' },
      { name: 'Below 60', min: 0, max: 59, count: 0, color: '#ef4444' },
    ];
    demoMarks.forEach(m => {
      const pct = (m.marks_obtained / m.maximum_marks) * 100;
      const range = ranges.find(r => pct >= r.min && pct <= r.max);
      if (range) range.count++;
    });
    return ranges;
  }, []);

  const attendanceBySubject = useMemo(() => {
    return demoSubjects.map(sub => {
      const att = demoAttendance.filter(a => a.subject_id === sub.id);
      const present = att.filter(a => a.status === 'present' || a.status === 'late').length;
      return { name: sub.subject_code, attendance: att.length > 0 ? Math.round((present / att.length) * 100) : 0 };
    });
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Overview Cards */}
      <div className="grid md:grid-cols-5 gap-4">
        {[
          { label: 'Average Marks', value: `${metrics.average_marks}%` },
          { label: 'GPA', value: metrics.gpa.toFixed(2) },
          { label: 'Performance Score', value: `${metrics.performance_score}%` },
          { label: 'Best Subject', value: subjectAvgs[0]?.name || '-' },
          { label: 'Weakest Subject', value: subjectAvgs[subjectAvgs.length - 1]?.name || '-' },
        ].map(card => (
          <div key={card.label} className="rounded-xl p-4 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{card.label}</p>
            <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Performance Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="name" stroke="var(--text-tertiary)" fontSize={12} />
              <YAxis stroke="var(--text-tertiary)" fontSize={12} domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="average" stroke="#3b82f6" strokeWidth={2} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Subject Comparison</h3>
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

        <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Marks Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={distributionData.filter(d => d.count > 0)} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, count }) => `${name}: ${count}`}>
                {distributionData.filter(d => d.count > 0).map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Attendance by Subject</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={attendanceBySubject}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="name" stroke="var(--text-tertiary)" fontSize={12} />
              <YAxis stroke="var(--text-tertiary)" fontSize={12} domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '8px' }} />
              <Bar dataKey="attendance" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights */}
      <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
        <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Your Academic Insights</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            <Award className="w-5 h-5 text-success-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Strongest: {subjectAvgs[0]?.fullName}</p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Average {subjectAvgs[0]?.avg}% — excellent performance</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            <AlertTriangle className="w-5 h-5 text-danger-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Weakest: {subjectAvgs[subjectAvgs.length - 1]?.fullName}</p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Average {subjectAvgs[subjectAvgs.length - 1]?.avg}% — needs attention</p>
            </div>
          </div>
          {trendData.length >= 2 && (
            <div className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              {trendData[trendData.length - 1].average >= trendData[trendData.length - 2].average
                ? <TrendingUp className="w-5 h-5 text-success-600 mt-0.5" />
                : <TrendingDown className="w-5 h-5 text-danger-600 mt-0.5" />}
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Overall Trend</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Average moved from {trendData[trendData.length - 2].average}% to {trendData[trendData.length - 1].average}%
                </p>
              </div>
            </div>
          )}
          <div className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            <TrendingUp className="w-5 h-5 text-primary-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Assignment Completion</p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{metrics.assignment_completion}% of assignments completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
