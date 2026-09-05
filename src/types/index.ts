export interface Profile {
  id: string;
  full_name: string;
  email: string;
  student_id: string;
  department: string;
  course: string;
  semester: number;
  section: string;
  admission_year: number;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Subject {
  id: string;
  student_id: string;
  subject_code: string;
  subject_name: string;
  credits: number;
  semester: number;
  created_at: string;
  updated_at: string;
}

export type AssessmentType = 'CAT' | 'CA' | 'Quiz' | 'Assignment' | 'Internal' | 'Model Exam' | 'End Semester';

export interface Mark {
  id: string;
  student_id: string;
  subject_id: string;
  assessment_type: AssessmentType;
  assessment_name: string;
  marks_obtained: number;
  maximum_marks: number;
  assessment_date: string;
  created_at: string;
  updated_at: string;
  subject?: Subject;
}

export type AttendanceStatus = 'present' | 'absent' | 'late';

export interface Attendance {
  id: string;
  student_id: string;
  subject_id: string;
  date: string;
  status: AttendanceStatus;
  created_at: string;
  subject?: Subject;
}

export type AssignmentStatus = 'pending' | 'submitted' | 'graded' | 'overdue';

export interface Assignment {
  id: string;
  student_id: string;
  subject_id: string;
  title: string;
  description: string | null;
  due_date: string;
  maximum_marks: number;
  status: AssignmentStatus;
  marks: number | null;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
  subject?: Subject;
}

export type GoalStatus = 'active' | 'completed' | 'failed' | 'paused';

export interface Goal {
  id: string;
  student_id: string;
  title: string;
  category: string;
  target_value: number;
  current_value: number;
  target_date: string;
  status: GoalStatus;
  created_at: string;
  updated_at: string;
}

export type RiskLevel = 'low' | 'medium' | 'high';

export interface Prediction {
  id: string;
  student_id: string;
  subject_id: string;
  prediction_type: string;
  predicted_score: number;
  confidence: number;
  risk_level: RiskLevel;
  explanation: string;
  factors: Record<string, number>;
  generated_at: string;
  subject?: Subject;
}

export type RecommendationPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Recommendation {
  id: string;
  student_id: string;
  subject_id: string | null;
  title: string;
  recommendation: string;
  reason: string;
  priority: RecommendationPriority;
  completed: boolean;
  created_at: string;
  subject?: Subject;
}

export type NotificationType = 'info' | 'warning' | 'success' | 'danger';

export interface Notification {
  id: string;
  student_id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  student_id: string;
  action: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface GradeScale {
  min_marks: number;
  max_marks: number;
  grade: string;
  grade_point: number;
}

export interface PerformanceMetrics {
  gpa: number;
  cgpa: number;
  average_marks: number;
  attendance_percentage: number;
  assignment_completion: number;
  performance_score: number;
  risk_level: RiskLevel;
  total_subjects: number;
  pending_assignments: number;
  strongest_subject: string | null;
  weakest_subject: string | null;
}
