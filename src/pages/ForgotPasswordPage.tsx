import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { GraduationCap } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/reset-password',
    });
    if (err) setError(err.message);
    else setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <GraduationCap className="w-10 h-10 text-primary-600" />
            <span className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>EduTrack V2</span>
          </Link>
        </div>
        <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          {sent ? (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Check your email</h2>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>We sent a password reset link to {email}</p>
              <Link to="/login" className="text-primary-600 font-medium hover:text-primary-700">Back to Login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>Reset Password</h2>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Enter your email to receive a reset link.</p>
              {error && <div className="p-3 rounded-lg bg-danger-50 text-danger-600 text-sm">{error}</div>}
              <div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500"
                  style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--input-border)', color: 'var(--text-primary)' }}
                  placeholder="student@university.edu" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-primary-600 text-white py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50">
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              <p className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                <Link to="/login" className="text-primary-600 font-medium">Back to Login</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
