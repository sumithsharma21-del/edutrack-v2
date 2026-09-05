import type { Subject, Mark, Attendance, Assignment, Goal, Prediction, Recommendation, Notification, PerformanceMetrics } from '@/types';

const STUDENT_ID = 'demo-student';

export const demoSubjects: Subject[] = [
  { id: 's1', student_id: STUDENT_ID, subject_code: 'CS301', subject_name: 'Data Structures & Algorithms', credits: 4, semester: 5, created_at: '2024-08-01', updated_at: '2024-08-01' },
  { id: 's2', student_id: STUDENT_ID, subject_code: 'CS302', subject_name: 'Database Management Systems', credits: 4, semester: 5, created_at: '2024-08-01', updated_at: '2024-08-01' },
  { id: 's3', student_id: STUDENT_ID, subject_code: 'CS303', subject_name: 'Computer Networks', credits: 3, semester: 5, created_at: '2024-08-01', updated_at: '2024-08-01' },
  { id: 's4', student_id: STUDENT_ID, subject_code: 'MA301', subject_name: 'Discrete Mathematics', credits: 3, semester: 5, created_at: '2024-08-01', updated_at: '2024-08-01' },
  { id: 's5', student_id: STUDENT_ID, subject_code: 'CS304', subject_name: 'Operating Systems', credits: 4, semester: 5, created_at: '2024-08-01', updated_at: '2024-08-01' },
  { id: 's6', student_id: STUDENT_ID, subject_code: 'CS305', subject_name: 'Software Engineering', credits: 3, semester: 5, created_at: '2024-08-01', updated_at: '2024-08-01' },
];

export const demoMarks: Mark[] = [
  { id: 'm1', student_id: STUDENT_ID, subject_id: 's1', assessment_type: 'CAT', assessment_name: 'CAT 1', marks_obtained: 42, maximum_marks: 50, assessment_date: '2024-09-15', created_at: '2024-09-15', updated_at: '2024-09-15' },
  { id: 'm2', student_id: STUDENT_ID, subject_id: 's1', assessment_type: 'CAT', assessment_name: 'CAT 2', marks_obtained: 38, maximum_marks: 50, assessment_date: '2024-10-20', created_at: '2024-10-20', updated_at: '2024-10-20' },
  { id: 'm3', student_id: STUDENT_ID, subject_id: 's1', assessment_type: 'Quiz', assessment_name: 'Quiz 1', marks_obtained: 9, maximum_marks: 10, assessment_date: '2024-09-05', created_at: '2024-09-05', updated_at: '2024-09-05' },
  { id: 'm4', student_id: STUDENT_ID, subject_id: 's2', assessment_type: 'CAT', assessment_name: 'CAT 1', marks_obtained: 35, maximum_marks: 50, assessment_date: '2024-09-15', created_at: '2024-09-15', updated_at: '2024-09-15' },
  { id: 'm5', student_id: STUDENT_ID, subject_id: 's2', assessment_type: 'CAT', assessment_name: 'CAT 2', marks_obtained: 40, maximum_marks: 50, assessment_date: '2024-10-20', created_at: '2024-10-20', updated_at: '2024-10-20' },
  { id: 'm6', student_id: STUDENT_ID, subject_id: 's3', assessment_type: 'CAT', assessment_name: 'CAT 1', marks_obtained: 28, maximum_marks: 50, assessment_date: '2024-09-15', created_at: '2024-09-15', updated_at: '2024-09-15' },
  { id: 'm7', student_id: STUDENT_ID, subject_id: 's3', assessment_type: 'CAT', assessment_name: 'CAT 2', marks_obtained: 32, maximum_marks: 50, assessment_date: '2024-10-20', created_at: '2024-10-20', updated_at: '2024-10-20' },
  { id: 'm8', student_id: STUDENT_ID, subject_id: 's4', assessment_type: 'CAT', assessment_name: 'CAT 1', marks_obtained: 30, maximum_marks: 50, assessment_date: '2024-09-15', created_at: '2024-09-15', updated_at: '2024-09-15' },
  { id: 'm9', student_id: STUDENT_ID, subject_id: 's4', assessment_type: 'CAT', assessment_name: 'CAT 2', marks_obtained: 25, maximum_marks: 50, assessment_date: '2024-10-20', created_at: '2024-10-20', updated_at: '2024-10-20' },
  { id: 'm10', student_id: STUDENT_ID, subject_id: 's5', assessment_type: 'CAT', assessment_name: 'CAT 1', marks_obtained: 44, maximum_marks: 50, assessment_date: '2024-09-15', created_at: '2024-09-15', updated_at: '2024-09-15' },
  { id: 'm11', student_id: STUDENT_ID, subject_id: 's5', assessment_type: 'CAT', assessment_name: 'CAT 2', marks_obtained: 46, maximum_marks: 50, assessment_date: '2024-10-20', created_at: '2024-10-20', updated_at: '2024-10-20' },
  { id: 'm12', student_id: STUDENT_ID, subject_id: 's6', assessment_type: 'CAT', assessment_name: 'CAT 1', marks_obtained: 40, maximum_marks: 50, assessment_date: '2024-09-15', created_at: '2024-09-15', updated_at: '2024-09-15' },
  { id: 'm13', student_id: STUDENT_ID, subject_id: 's6', assessment_type: 'Assignment', assessment_name: 'Assignment 1', marks_obtained: 18, maximum_marks: 20, assessment_date: '2024-09-25', created_at: '2024-09-25', updated_at: '2024-09-25' },
];

function generateAttendance(): Attendance[] {
  const records: Attendance[] = [];
  let id = 1;
  const statuses: Array<Attendance['status']> = ['present', 'present', 'present', 'present', 'present', 'present', 'absent', 'late', 'present', 'present'];
  for (const sub of demoSubjects) {
    for (let d = 1; d <= 30; d++) {
      const date = new Date(2024, 7 + Math.floor(d / 15), (d % 28) + 1);
      records.push({
        id: `a${id++}`,
        student_id: STUDENT_ID,
        subject_id: sub.id,
        date: date.toISOString().split('T')[0],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        created_at: date.toISOString(),
      });
    }
  }
  return records;
}

export const demoAttendance: Attendance[] = generateAttendance();

export const demoAssignments: Assignment[] = [
  { id: 'asgn1', student_id: STUDENT_ID, subject_id: 's1', title: 'Implement Binary Search Tree', description: 'Implement BST with insert, delete, and search operations.', due_date: '2024-10-01', maximum_marks: 20, status: 'graded', marks: 18, submitted_at: '2024-09-30', created_at: '2024-09-15', updated_at: '2024-10-05' },
  { id: 'asgn2', student_id: STUDENT_ID, subject_id: 's2', title: 'ER Diagram for Library System', description: 'Design complete ER diagram.', due_date: '2024-10-10', maximum_marks: 25, status: 'graded', marks: 22, submitted_at: '2024-10-09', created_at: '2024-09-20', updated_at: '2024-10-15' },
  { id: 'asgn3', student_id: STUDENT_ID, subject_id: 's3', title: 'TCP Socket Programming', description: 'Build client-server chat application.', due_date: '2024-11-01', maximum_marks: 30, status: 'pending', marks: null, submitted_at: null, created_at: '2024-10-15', updated_at: '2024-10-15' },
  { id: 'asgn4', student_id: STUDENT_ID, subject_id: 's5', title: 'Process Scheduling Simulation', description: 'Simulate FCFS, SJF, Round Robin.', due_date: '2024-10-25', maximum_marks: 20, status: 'submitted', marks: null, submitted_at: '2024-10-24', created_at: '2024-10-10', updated_at: '2024-10-24' },
  { id: 'asgn5', student_id: STUDENT_ID, subject_id: 's4', title: 'Graph Theory Problem Set', description: 'Solve 10 graph theory problems.', due_date: '2024-10-18', maximum_marks: 15, status: 'overdue', marks: null, submitted_at: null, created_at: '2024-10-05', updated_at: '2024-10-05' },
];

export const demoGoals: Goal[] = [
  { id: 'g1', student_id: STUDENT_ID, title: 'Score 85%+ in DSA CAT 3', category: 'Academics', target_value: 85, current_value: 80, target_date: '2024-11-15', status: 'active', created_at: '2024-10-01', updated_at: '2024-10-20' },
  { id: 'g2', student_id: STUDENT_ID, title: 'Maintain 90% Attendance', category: 'Attendance', target_value: 90, current_value: 84, target_date: '2024-12-01', status: 'active', created_at: '2024-08-01', updated_at: '2024-10-20' },
  { id: 'g3', student_id: STUDENT_ID, title: 'Improve Math from 55% to 75%', category: 'Academics', target_value: 75, current_value: 55, target_date: '2024-12-15', status: 'active', created_at: '2024-10-01', updated_at: '2024-10-20' },
  { id: 'g4', student_id: STUDENT_ID, title: 'Complete all OS assignments', category: 'Assignments', target_value: 100, current_value: 60, target_date: '2024-11-30', status: 'active', created_at: '2024-09-01', updated_at: '2024-10-20' },
];

export const demoPredictions: Prediction[] = [
  { id: 'p1', student_id: STUDENT_ID, subject_id: 's1', prediction_type: 'subject_score', predicted_score: 82, confidence: 85, risk_level: 'low', explanation: 'Consistently strong performance in DSA assessments. Recent CAT scores averaging 80%. High assignment completion rate.', factors: { recent_marks: 80, attendance: 90, assignments: 95, trend: 2 }, generated_at: '2024-10-25' },
  { id: 'p2', student_id: STUDENT_ID, subject_id: 's2', prediction_type: 'subject_score', predicted_score: 76, confidence: 78, risk_level: 'low', explanation: 'Improving trend in DBMS. CAT 2 score improved by 10% over CAT 1.', factors: { recent_marks: 75, attendance: 85, assignments: 88, trend: 10 }, generated_at: '2024-10-25' },
  { id: 'p3', student_id: STUDENT_ID, subject_id: 's3', prediction_type: 'subject_score', predicted_score: 62, confidence: 72, risk_level: 'medium', explanation: 'Computer Networks scores are below average. Slight improvement in CAT 2 but needs consistent effort.', factors: { recent_marks: 60, attendance: 80, assignments: 70, trend: 8 }, generated_at: '2024-10-25' },
  { id: 'p4', student_id: STUDENT_ID, subject_id: 's4', prediction_type: 'subject_score', predicted_score: 52, confidence: 68, risk_level: 'high', explanation: 'Declining performance in Mathematics. CAT 2 dropped 10% from CAT 1. Missing assignment deadline is concerning.', factors: { recent_marks: 50, attendance: 78, assignments: 40, trend: -10 }, generated_at: '2024-10-25' },
  { id: 'p5', student_id: STUDENT_ID, subject_id: 's5', prediction_type: 'subject_score', predicted_score: 91, confidence: 90, risk_level: 'low', explanation: 'Excellent performance in OS. Both CATs above 88%. All assignments on track.', factors: { recent_marks: 90, attendance: 92, assignments: 100, trend: 4 }, generated_at: '2024-10-25' },
  { id: 'p6', student_id: STUDENT_ID, subject_id: 's6', prediction_type: 'subject_score', predicted_score: 82, confidence: 80, risk_level: 'low', explanation: 'Good SE performance with high assignment marks. Consistent attendance.', factors: { recent_marks: 80, attendance: 88, assignments: 90, trend: 0 }, generated_at: '2024-10-25' },
];

export const demoRecommendations: Recommendation[] = [
  { id: 'r1', student_id: STUDENT_ID, subject_id: 's4', title: 'Focus on Mathematics', recommendation: 'Mathematics performance has declined 10% since CAT 1. Allocate at least 45 minutes daily to revise concepts. Focus on graph theory and combinatorics.', reason: 'CAT 2 marks dropped from 60% to 50%.', priority: 'high', completed: false, created_at: '2024-10-25' },
  { id: 'r2', student_id: STUDENT_ID, subject_id: 's3', title: 'Improve Computer Networks', recommendation: 'Your CN scores are below class average. Review TCP/IP fundamentals and practice socket programming assignments.', reason: 'Average marks at 60% which is below target.', priority: 'medium', completed: false, created_at: '2024-10-25' },
  { id: 'r3', student_id: STUDENT_ID, subject_id: null, title: 'Complete Overdue Assignment', recommendation: 'You have 1 overdue assignment in Mathematics. Submit it immediately to avoid further grade penalties.', reason: 'Graph Theory Problem Set is past due date.', priority: 'critical', completed: false, created_at: '2024-10-25' },
  { id: 'r4', student_id: STUDENT_ID, subject_id: 's5', title: 'Maintain OS Excellence', recommendation: 'Your Operating Systems performance is outstanding. Continue with current study habits and consider helping peers.', reason: 'Consistent 90%+ performance.', priority: 'low', completed: false, created_at: '2024-10-25' },
];

export const demoNotifications: Notification[] = [
  { id: 'n1', student_id: STUDENT_ID, title: 'Assignment Due Tomorrow', message: 'TCP Socket Programming assignment is due on Nov 1.', type: 'warning', read: false, created_at: '2024-10-31T08:00:00' },
  { id: 'n2', student_id: STUDENT_ID, title: 'Attendance Warning', message: 'Your Computer Networks attendance is at 80%, approaching the 75% threshold.', type: 'danger', read: false, created_at: '2024-10-30T10:00:00' },
  { id: 'n3', student_id: STUDENT_ID, title: 'Performance Improvement', message: 'Your DBMS score improved by 10% in CAT 2!', type: 'success', read: true, created_at: '2024-10-22T14:00:00' },
  { id: 'n4', student_id: STUDENT_ID, title: 'New Prediction Available', message: 'Updated predictions for all subjects are now available.', type: 'info', read: true, created_at: '2024-10-25T09:00:00' },
];

export function calculateDemoMetrics(): PerformanceMetrics {
  const subjectAverages = demoSubjects.map(sub => {
    const subMarks = demoMarks.filter(m => m.subject_id === sub.id);
    if (subMarks.length === 0) return { subject: sub, avg: 0 };
    const avg = subMarks.reduce((sum, m) => sum + (m.marks_obtained / m.maximum_marks) * 100, 0) / subMarks.length;
    return { subject: sub, avg };
  });

  const overallAvg = subjectAverages.reduce((s, sa) => s + sa.avg, 0) / subjectAverages.length;

  const totalPresent = demoAttendance.filter(a => a.status === 'present' || a.status === 'late').length;
  const attendancePct = (totalPresent / demoAttendance.length) * 100;

  const completedAssignments = demoAssignments.filter(a => a.status === 'graded' || a.status === 'submitted').length;
  const assignmentCompletion = (completedAssignments / demoAssignments.length) * 100;
  const pendingAssignments = demoAssignments.filter(a => a.status === 'pending' || a.status === 'overdue').length;

  const sorted = [...subjectAverages].sort((a, b) => b.avg - a.avg);
  const strongest = sorted[0];
  const weakest = sorted[sorted.length - 1];

  const gradePoints: Record<string, number> = {};
  subjectAverages.forEach(sa => {
    let gp = 0;
    if (sa.avg >= 90) gp = 10;
    else if (sa.avg >= 80) gp = 9;
    else if (sa.avg >= 70) gp = 8;
    else if (sa.avg >= 60) gp = 7;
    else if (sa.avg >= 50) gp = 6;
    else if (sa.avg >= 40) gp = 5;
    else gp = 0;
    gradePoints[sa.subject.id] = gp;
  });

  let totalCredits = 0;
  let totalGP = 0;
  demoSubjects.forEach(sub => {
    totalCredits += sub.credits;
    totalGP += (gradePoints[sub.id] || 0) * sub.credits;
  });
  const gpa = totalGP / totalCredits;

  const performanceScore = overallAvg * 0.4 + attendancePct * 0.2 + assignmentCompletion * 0.2 + gpa * 10 * 0.2;

  let riskLevel: 'low' | 'medium' | 'high' = 'low';
  if (performanceScore < 60) riskLevel = 'high';
  else if (performanceScore < 75) riskLevel = 'medium';

  return {
    gpa: Math.round(gpa * 100) / 100,
    cgpa: Math.round(gpa * 100) / 100,
    average_marks: Math.round(overallAvg * 10) / 10,
    attendance_percentage: Math.round(attendancePct * 10) / 10,
    assignment_completion: Math.round(assignmentCompletion * 10) / 10,
    performance_score: Math.round(performanceScore * 10) / 10,
    risk_level: riskLevel,
    total_subjects: demoSubjects.length,
    pending_assignments: pendingAssignments,
    strongest_subject: strongest?.subject.subject_name || null,
    weakest_subject: weakest?.subject.subject_name || null,
  };
}
