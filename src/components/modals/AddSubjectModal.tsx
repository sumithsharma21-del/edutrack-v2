import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface Subject {
  id?: string;
  name: string;
  code: string;
  credits: number;
  instructor?: string;
  semester?: number;
}

export default function AddSubjectModal({ isOpen, onClose, onAdd }: { isOpen: boolean; onClose: () => void; onAdd: () => void }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState<Subject>({ name: '', code: '', credits: 3, instructor: '', semester: 5 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    const { error } = await supabase.from('subjects').insert({
      user_id: user.id,
      name: subject.name,
      code: subject.code,
      credits: subject.credits,
      instructor: subject.instructor || null,
      semester: subject.semester || null,
    });

    if (error) {
      toast.error('Failed to add subject');
    } else {
      toast.success('Subject added!');
      setSubject({ name: '', code: '', credits: 3, instructor: '', semester: 5 });
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
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Add Subject</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Subject Name *</label>
            <input type="text" required value={subject.name} onChange={(e) => setSubject({...subject, name: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Data Structures" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Subject Code *</label>
            <input type="text" required value={subject.code} onChange={(e) => setSubject({...subject, code: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., CS201" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Credits</label>
              <input type="number" min="1" max="6" value={subject.credits} onChange={(e) => setSubject({...subject, credits: parseFloat(e.target.value)})}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Semester</label>
              <select value={subject.semester} onChange={(e) => setSubject({...subject, semester: parseInt(e.target.value)})}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Instructor</label>
            <input type="text" value={subject.instructor} onChange={(e) => setSubject({...subject, instructor: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Dr. Smith" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50">
            {loading ? 'Adding...' : 'Add Subject'}
          </button>
        </form>
      </div>
    </div>
  );
}
