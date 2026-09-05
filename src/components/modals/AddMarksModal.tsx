import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

interface Mark {
  subject_id: string;
  assessment_type: 'CAT1' | 'CAT2' | 'Assignment' | 'Practical' | 'Project' | 'Exam';
  obtained_marks: number;
  total_marks: number;
  date?: string;
  remarks?: string;
}

export default function AddMarksModal({ isOpen, onClose, subjects, onAdd }: { isOpen: boolean; onClose: () => void; subjects: any[]; onAdd: () => void }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [mark, setMark] = useState<Mark>({
    subject_id: subjects[0]?.id || '',
    assessment_type: 'CAT1',
    obtained_marks: 0,
    total_marks: 100,
    date: new Date().toISOString().split('T')[0],
    remarks: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !mark.subject_id) return;

    setLoading(true);
    const { error } = await supabase.from('marks').insert({
      user_id: user.id,
      subject_id: mark.subject_id,
      assessment_type: mark.assessment_type,
      obtained_marks: mark.obtained_marks,
      total_marks: mark.total_marks,
      date: mark.date ? new Date(mark.date).toISOString() : null,
      remarks: mark.remarks || null,
    });

    if (error) {
      toast.error('Failed to add marks');
    } else {
      toast.success('Marks added!');
      setMark({ subject_id: subjects[0]?.id || '', assessment_type: 'CAT1', obtained_marks: 0, total_marks: 100, date: new Date().toISOString().split('T')[0], remarks: '' });
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
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Add Marks</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Subject *</label>
            <select required value={mark.subject_id} onChange={(e) => setMark({...mark, subject_id: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option value="">Select Subject</option>
              {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Assessment Type *</label>
            <select required value={mark.assessment_type} onChange={(e) => setMark({...mark, assessment_type: e.target.value as any})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option value="CAT1">CAT 1</option>
              <option value="CAT2">CAT 2</option>
              <option value="Assignment">Assignment</option>
              <option value="Practical">Practical</option>
              <option value="Project">Project</option>
              <option value="Exam">Exam</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Obtained Marks *</label>
              <input type="number" min="0" required value={mark.obtained_marks} onChange={(e) => setMark({...mark, obtained_marks: parseFloat(e.target.value)})}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Total Marks *</label>
              <input type="number" min="0" required value={mark.total_marks} onChange={(e) => setMark({...mark, total_marks: parseFloat(e.target.value)})}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <input type="date" value={mark.date} onChange={(e) => setMark({...mark, date: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Remarks</label>
            <textarea value={mark.remarks} onChange={(e) => setMark({...mark, remarks: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Optional notes..." rows={2} />
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50">
            {loading ? 'Adding...' : 'Add Marks'}
          </button>
        </form>
      </div>
    </div>
  );
}
