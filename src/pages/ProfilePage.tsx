import { User, Mail, Hash, Building, BookOpen, Calendar } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function ProfilePage() {
  const { profile, user } = useAuth();

  const fields = [
    { icon: User, label: 'Full Name', value: profile?.full_name || 'Not set' },
    { icon: Mail, label: 'Email', value: user?.email || profile?.email || 'Not set' },
    { icon: Hash, label: 'Student ID', value: profile?.student_id || 'Not set' },
    { icon: Building, label: 'Department', value: profile?.department || 'Not set' },
    { icon: BookOpen, label: 'Course', value: profile?.course || 'Not set' },
    { icon: Calendar, label: 'Semester', value: profile?.semester?.toString() || 'Not set' },
    { icon: Hash, label: 'Section', value: profile?.section || 'Not set' },
    { icon: Calendar, label: 'Admission Year', value: profile?.admission_year?.toString() || 'Not set' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Avatar */}
      <div className="rounded-xl p-6 border text-center" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
        <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-3">
          <span className="text-3xl font-bold text-primary-700">
            {profile?.full_name?.charAt(0)?.toUpperCase() || 'S'}
          </span>
        </div>
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{profile?.full_name || 'Student'}</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{user?.email || ''}</p>
      </div>

      {/* Info */}
      <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
        <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Profile Information</h3>
        <div className="space-y-4">
          {fields.map(f => (
            <div key={f.label} className="flex items-center gap-3">
              <f.icon className="w-5 h-5 shrink-0" style={{ color: 'var(--text-tertiary)' }} />
              <div className="flex-1">
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{f.label}</p>
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{f.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
