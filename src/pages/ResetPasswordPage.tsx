import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { GraduationCap } from 'lucide-react';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Check if user has a valid session from the reset link
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        setError('Invalid or expired reset link. Please request a new one.');
      }
    };
    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    const { error: err } = await supabase.auth.updateUser({ password });

    if (err) {
      setError(err.message);
    } else {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <GraduationCap className="w-10 h-10 text-primary-600" />
            <span className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>EduTrack V2</span>
          </div>
        </div>

        <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          {success ? (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2 text-success-600">Password Reset Successful!</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Redirecting to login...</p>
            </div>
          ) : error ? (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2 text-danger-600">Error</h2>
              <p style={{ color: 'var(--text-secondary)' }}>{error}</p>
              <p className="mt-4 text-sm">
                <a href="/forgot-password" className="text-primary-600 font-medium hover:text-primary-700">
                  Request a new reset link
                </a>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>Set New Password</h2>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Enter your new password below.</p>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>New Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 pr-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500"
                    style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--input-border)', color: 'var(--text-primary)' }}
                    placeholder="Enter new password"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Confirm Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500"
                  style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--input-border)', color: 'var(--text-primary)' }}
                  placeholder="Confirm new password"
                />
              </div>

              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="rounded"
                />
                <span style={{ color: 'var(--text-secondary)' }}>Show password</span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Reset Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
