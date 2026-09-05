import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { demoSubjects, demoMarks, demoAttendance, demoPredictions, demoRecommendations } from '@/services/demoData';
import { cn, getRiskBg, formatDate } from '@/utils/helpers';

export default function SubjectDetailPage() {
  const { id } = useParams();
  const subject = demoSubjects.find(s => s.id === id);
  const marks = useMemo(() => demoMarks.filter(m => m.subject_id === id).sort((a, b) => new Date(a.assessment_date).getTime() - new Date(b.assessment_date).getTime()), [id]);
  const attendance = useMemo(() => demoAttendance.filter(a => a.subject_id === id), [id]);
  const prediction = demoPredictions.find(p => p.subject_id === id);
  const recs = demoRecommendations.filter(r => r.subject_id === id);

  if (!subject) return <div className="text-center py-20" style={{ color: 'var(--text-secondary)' }}>Subject not found.</div>;

  const avg = marks.length > 0 ? marks.reduce((s, m) => s + (m.marks_obtained / m.maximum_marks) * 100, 0) / marks.length : 0;
  const present = attendance.filter(a => a.status === 'present' || a.status === 'late').length;
  const attPct = attendance.length > 0 ? (present / attendance.length) * 100 : 0;

  const chartData = marks.map(m => ({
    name: m.assessment_name,
    score: Math.round((m.marks_obtained / m.maximum_marks) * 100),
  }));

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Link to="/subjects" className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700">
        <ArrowLeft className="w-4 h-4" /> Back to Subjects
      </Link>

      <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{subject.subject_name}</h2>
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{subject.subject_code} | {subject.credits} credits | Semester {subject.semester}</p>
            </div>
          </div>
          {prediction && <span className={cn('px-3 py-1 rounded-full text-sm font-medium', getRiskBg(prediction.risk_level))}>{prediction.risk_level} risk</span>}
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="rounded-xl p-4 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Average</p>
          <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{Math.round(avg)}%</p>
        </div>
        <div className="rounded-xl p-4 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Attendance</p>
          <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{Math.round(attPct)}%</p>
        </div>
        <div className="rounded-xl p-4 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Predicted</p>
          <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{prediction?.predicted_score ?? '-'}%</p>
        </div>
        <div className="rounded-xl p-4 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Confidence</p>
          <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{prediction?.confidence ?? '-'}%</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Performance Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="name" stroke="var(--text-tertiary)" fontSize={12} />
              <YAxis stroke="var(--text-tertiary)" fontSize={12} domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Assessment History</h3>
          <div className="space-y-3">
            {marks.map(m => (
              <div key={m.id} className="flex items-center justify-between py-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{m.assessment_name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{m.assessment_type} | {formatDate(m.assessment_date)}</p>
                </div>
                <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{m.marks_obtained}/{m.maximum_marks}</p>
              </div>
            ))}
            {marks.length === 0 && <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>No assessments yet.</p>}
          </div>
        </div>
      </div>

      {prediction && (
        <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Prediction Analysis</h3>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>{prediction.explanation}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(prediction.factors).map(([key, val]) => (
              <div key={key} className="rounded-lg p-3" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <p className="text-xs capitalize" style={{ color: 'var(--text-tertiary)' }}>{key.replace('_', ' ')}</p>
                <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{val as number}{typeof val === 'number' && key !== 'trend' ? '%' : ''}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {recs.length > 0 && (
        <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Recommendations</h3>
          <div className="space-y-3">
            {recs.map(r => (
              <div key={r.id} className="rounded-lg p-3" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{r.title}</p>
                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{r.recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
