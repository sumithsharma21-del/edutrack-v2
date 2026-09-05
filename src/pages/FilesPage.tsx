import { FolderOpen, Upload } from 'lucide-react';

export default function FilesPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Upload and manage your study materials.</p>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors">
          <Upload className="w-4 h-4" /> Upload File
        </button>
      </div>

      <div className="text-center py-20">
        <FolderOpen className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--text-tertiary)' }} />
        <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>No files uploaded yet</h3>
        <p className="text-sm mb-4 max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
          Upload your lecture notes, PDFs, question papers, and study materials. EduTrack AI will be able to search and reference them.
        </p>
        <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors">
          <Upload className="w-4 h-4" /> Upload Your First File
        </button>
      </div>
    </div>
  );
}
