import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

interface Attendance {
  subject_id: string;
  date: string;
  status: 'present' | 'absent' | 'leave';
  remarks?: string;
}

export default function AddAttendanceModal({ isOpen, onClose, subjects, onAdd }: { isOpen: boolean; onClose: () => void; subjects: any[]; onAdd: () => void }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState<Attendance>({
    subject_id: subjects[0]?.id || '',
    date: new Date().toISOString().split('T')[0],
    status: 'present',
    remarks: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !attendance.subject_id) return;

    setLoading(true);
    const { error } = await supabase.from('attendance').insert({
      user_id: user.id,
      subject_id: attendance.subject_id,
      date: new Date(attendance.date).toISOString(),
      status: attendance.status,
      remarks: attendance.remarks || null,
    });

    if (error) {
      toast.error('Failed to add attendance');
    } else {
      toast.success('Attendance recorded!');
      setAttendance({ subject_id: subjects[0]?.id || '', date: new Date().toISOString().split('T')[0], status: 'present', remarks: '' });
      onAdd();
      onClose();
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Add Attendance</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Subject *</label>
            <select required value={attendance.subject_id} onChange={(e) => setAttendance({...attendance, subject_id: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent">
              <option value="">Select Subject</option>
              {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Date *</label>
            <input type="date" required value={attendance.date} onChange={(e) => setAttendance({...attendance, date: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status *</label>
            <div className="grid grid-cols-3 gap-3">
              {['present', 'absent', 'leave'].map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setAttendance({...attendance, status: s as any})}
                  className={`py-2 px-3 rounded-lg font-medium transition-all ${
                    attendance.status === s
                      ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600'
                  }`}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Remarks</label>
            <textarea value={attendance.remarks} onChange={(e) => setAttendance({...attendance, remarks: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Optional notes..." rows={2} />
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50">
            {loading ? 'Recording...' : 'Record Attendance'}
          </button>
        </form>
      </div>
    </div>
  );
}
