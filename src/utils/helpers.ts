import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPercentage(value: number): string {
  return `${Math.round(value * 10) / 10}%`;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getRelativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return formatDate(dateStr);
}

export function getRiskColor(risk: string): string {
  switch (risk) {
    case 'low': return 'text-success-600';
    case 'medium': return 'text-warning-600';
    case 'high': return 'text-danger-600';
    default: return 'text-surface-500';
  }
}

export function getRiskBg(risk: string): string {
  switch (risk) {
    case 'low': return 'bg-success-50 text-success-700';
    case 'medium': return 'bg-warning-50 text-warning-600';
    case 'high': return 'bg-danger-50 text-danger-600';
    default: return 'bg-surface-100 text-surface-600';
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'present': case 'submitted': case 'graded': case 'completed': case 'active':
      return 'bg-success-50 text-success-700';
    case 'absent': case 'overdue': case 'failed': case 'high':
      return 'bg-danger-50 text-danger-600';
    case 'late': case 'pending': case 'paused': case 'medium':
      return 'bg-warning-50 text-warning-600';
    default:
      return 'bg-surface-100 text-surface-600';
  }
}
