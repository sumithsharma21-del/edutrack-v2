import { useMemo } from 'react';
import { FileText, Download } from 'lucide-react';
import { calculateDemoMetrics, demoSubjects, demoMarks, demoAttendance, demoAssignments, demoPredictions, demoRecommendations } from '@/services/demoData';
import { cn, getRiskBg } from '@/utils/helpers';

export default function ReportsPage() {
  const metrics = useMemo(() => calculateDemoMetrics(), []);

  const subjectDetails = useMemo(() => {
    return demoSubjects.map(sub => {
      const marks = demoMarks.filter(m => m.subject_id === sub.id);
      const avg = marks.length > 0 ? marks.reduce((s, m) => s + (m.marks_obtained / m.maximum_marks) * 100, 0) / marks.length : 0;
      const att = demoAttendance.filter(a => a.subject_id === sub.id);
      const present = att.filter(a => a.status === 'present' || a.status === 'late').length;
      const attPct = att.length > 0 ? (present / att.length) * 100 : 0;
      const pred = demoPredictions.find(p => p.subject_id === sub.id);
      return { subject: sub, avg: Math.round(avg), attPct: Math.round(attPct), prediction: pred };
    });
  }, []);

  const exportCSV = () => {
    const headers = ['Subject', 'Code', 'Credits', 'Average %', 'Attendance %', 'Predicted Score', 'Risk Level'];
    const rows = subjectDetails.map(sd => [
      sd.subject.subject_name, sd.subject.subject_code, sd.subject.credits,
      sd.avg, sd.attPct, sd.prediction?.predicted_score ?? '', sd.prediction?.risk_level ?? '',
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'edutrack_report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Your comprehensive academic report.</p>
        <button onClick={exportCSV} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Summary */}
      <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
        <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Academic Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div><p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>GPA</p><p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{metrics.gpa}</p></div>
          <div><p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Average</p><p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{metrics.average_marks}%</p></div>
          <div><p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Attendance</p><p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{metrics.attendance_percentage}%</p></div>
          <div><p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Risk</p><p className={cn('text-xl font-bold uppercase', metrics.risk_level === 'low' ? 'text-success-600' : metrics.risk_level === 'medium' ? 'text-warning-600' : 'text-danger-600')}>{metrics.risk_level}</p></div>
        </div>
      </div>

      {/* Subject Table */}
      <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <th className="text-left px-4 py-3 font-medium" style={{ color: 'var(--text-secondary)' }}>Subject</th>
                <th className="text-left px-4 py-3 font-medium" style={{ color: 'var(--text-secondary)' }}>Code</th>
                <th className="text-center px-4 py-3 font-medium" style={{ color: 'var(--text-secondary)' }}>Credits</th>
                <th className="text-center px-4 py-3 font-medium" style={{ color: 'var(--text-secondary)' }}>Average</th>
                <th className="text-center px-4 py-3 font-medium" style={{ color: 'var(--text-secondary)' }}>Attendance</th>
                <th className="text-center px-4 py-3 font-medium" style={{ color: 'var(--text-secondary)' }}>Predicted</th>
                <th className="text-center px-4 py-3 font-medium" style={{ color: 'var(--text-secondary)' }}>Risk</th>
              </tr>
            </thead>
            <tbody>
              {subjectDetails.map(sd => (
                <tr key={sd.subject.id} className="border-t" style={{ borderColor: 'var(--border-color)' }}>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-primary)' }}>{sd.subject.subject_name}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{sd.subject.subject_code}</td>
                  <td className="px-4 py-3 text-center" style={{ color: 'var(--text-primary)' }}>{sd.subject.credits}</td>
                  <td className="px-4 py-3 text-center font-medium" style={{ color: 'var(--text-primary)' }}>{sd.avg}%</td>
                  <td className="px-4 py-3 text-center" style={{ color: 'var(--text-primary)' }}>{sd.attPct}%</td>
                  <td className="px-4 py-3 text-center font-medium" style={{ color: 'var(--text-primary)' }}>{sd.prediction?.predicted_score ?? '-'}%</td>
                  <td className="px-4 py-3 text-center">
                    {sd.prediction && <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', getRiskBg(sd.prediction.risk_level))}>{sd.prediction.risk_level}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations in report */}
      <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
        <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Recommendations</h3>
        <ul className="space-y-2">
          {demoRecommendations.map(r => (
            <li key={r.id} className="text-sm flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
              <span style={{ color: 'var(--text-secondary)' }}>{r.recommendation}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
