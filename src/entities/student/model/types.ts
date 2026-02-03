export type ProgressStatus = 'PASSED' | 'NOT_SUBMITTED' | 'PARTIAL' | 'FAILED';

export interface StudentProgress {
  status: ProgressStatus;
}

export interface Student {
  id: number;
  studentId: string;
  name: string;
  score: number;
  totalScore: number;
  progress: StudentProgress[];
}

export interface CourseStudentsResponse {
  success: boolean;
  response: {
    id: number;
    title: string;
    section: string;
    unitCount: number;
    studentCount: number;
    students: Student[];
  };
}