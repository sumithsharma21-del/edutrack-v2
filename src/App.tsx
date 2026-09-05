import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { ThemeProvider } from '@/hooks/useTheme';
import AppLayout from '@/components/layout/AppLayout';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/ResetPasswordPage';
import DashboardPage from '@/pages/DashboardPage';
import AnalyticsPage from '@/pages/AnalyticsPage';
import SubjectsPage from '@/pages/SubjectsPage';
import SubjectDetailPage from '@/pages/SubjectDetailPage';
import AttendancePage from '@/pages/AttendancePage';
import AssignmentsPage from '@/pages/AssignmentsPage';
import PredictionsPage from '@/pages/PredictionsPage';
import RecommendationsPage from '@/pages/RecommendationsPage';
import GoalsPage from '@/pages/GoalsPage';
import NotificationsPage from '@/pages/NotificationsPage';
import ProfilePage from '@/pages/ProfilePage';
import SettingsPage from '@/pages/SettingsPage';
import ReportsPage from '@/pages/ReportsPage';
import AIPage from '@/pages/AIPage';
import FilesPage from '@/pages/FilesPage';
import type { ReactNode } from 'react';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function PublicRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Navigate to="/dashboard" /> : <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/subjects" element={<SubjectsPage />} />
        <Route path="/subjects/:id" element={<SubjectDetailPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/assignments" element={<AssignmentsPage />} />
        <Route path="/predictions" element={<PredictionsPage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/ai" element={<AIPage />} />
        <Route path="/files" element={<FilesPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
          <Toaster position="top-right" toastOptions={{
            style: { background: 'var(--card-bg)', color: 'var(--text-primary)', border: '1px solid var(--card-border)' },
          }} />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
