import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

interface Assignment {
  subject_id: string;
  title: string;
  description?: string;
  due_date: string;
  marks?: number;
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  obtained_marks?: number;
}

export default function AddAssignmentModal({ isOpen, onClose, subjects, onAdd }: { isOpen: boolean; onClose: () => void; subjects: any[]; onAdd: () => void }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [assignment, setAssignment] = useState<Assignment>({
    subject_id: subjects[0]?.id || '',
    title: '',
    description: '',
    due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    marks: 10,
    status: 'pending',
    obtained_marks: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !assignment.subject_id || !assignment.title) return;

    setLoading(true);
    const { error } = await supabase.from('assignments').insert({
      user_id: user.id,
      subject_id: assignment.subject_id,
      title: assignment.title,
      description: assignment.description || null,
      due_date: new Date(assignment.due_date).toISOString(),
      marks: assignment.marks || null,
      status: assignment.status,
      obtained_marks: assignment.obtained_marks || null,
    });

    if (error) {
      toast.error('Failed to add assignment');
    } else {
      toast.success('Assignment added!');
      setAssignment({ subject_id: subjects[0]?.id || '', title: '', description: '', due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], marks: 10, status: 'pending', obtained_marks: 0 });
      onAdd();
      onClose();
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6 sticky top-0 bg-white dark:bg-slate-800">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Add Assignment</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Subject *</label>
            <select required value={assignment.subject_id} onChange={(e) => setAssignment({...assignment, subject_id: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-2 focus:ring-violet-500 focus:border-transparent">
              <option value="">Select Subject</option>
              {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input type="text" required value={assignment.title} onChange={(e) => setAssignment({...assignment, title: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              placeholder="e.g., Project Report" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea value={assignment.description} onChange={(e) => setAssignment({...assignment, description: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              placeholder="Assignment details..." rows={2} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Due Date *</label>
              <input type="date" required value={assignment.due_date} onChange={(e) => setAssignment({...assignment, due_date: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-2 focus:ring-violet-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Marks</label>
              <input type="number" min="0" value={assignment.marks} onChange={(e) => setAssignment({...assignment, marks: parseFloat(e.target.value) || 0})}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-2 focus:ring-violet-500 focus:border-transparent" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select value={assignment.status} onChange={(e) => setAssignment({...assignment, status: e.target.value as any})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-2 focus:ring-violet-500 focus:border-transparent">
              <option value="pending">Pending</option>
              <option value="submitted">Submitted</option>
              <option value="graded">Graded</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          {assignment.status === 'graded' && (
            <div>
              <label className="block text-sm font-medium mb-2">Obtained Marks</label>
              <input type="number" min="0" value={assignment.obtained_marks} onChange={(e) => setAssignment({...assignment, obtained_marks: parseFloat(e.target.value) || 0})}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-2 focus:ring-violet-500 focus:border-transparent" />
            </div>
          )}

          <button type="submit" disabled={loading}
            className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50">
            {loading ? 'Adding...' : 'Add Assignment'}
          </button>
        </form>
      </div>
    </div>
  );
}
