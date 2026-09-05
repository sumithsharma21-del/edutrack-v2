import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/analytics': 'Analytics',
  '/subjects': 'Subjects',
  '/attendance': 'Attendance',
  '/assignments': 'Assignments',
  '/predictions': 'Predictions',
  '/recommendations': 'Recommendations',
  '/goals': 'Goals',
  '/ai': 'EduTrack AI',
  '/files': 'Files',
  '/reports': 'Reports',
  '/notifications': 'Notifications',
  '/profile': 'Profile',
  '/settings': 'Settings',
};

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const pathBase = '/' + location.pathname.split('/')[1];
  const title = pageTitles[pathBase] || '';

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} title={title} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
