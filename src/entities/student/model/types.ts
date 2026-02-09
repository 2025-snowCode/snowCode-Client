import type {ApiResponse} from '@/models/common';

export type ProgressStatus = 'PASSED' | 'NOT_SUBMITTED' | 'PARTIAL' | 'FAILED';

export interface StudentProgress {
  status: ProgressStatus;
  assignmentName?: string;
  score?: number;
  totalScore?: number;
  plagiarismRate?: number;
}

export interface Unit {
  id: number;
  name: string;
  title: string;
  startDate: string;
  endDate: string;
  assignments: StudentProgress[];
}

export interface Student {
  id: number;
  studentId: string;
  name: string;
  score: number;
  totalScore: number;
  progress: StudentProgress[];
  units?: Unit[];
}

export type CourseStudentsResponse = ApiResponse<{
  id: number;
  title: string;
  section: string;
  unitCount: number;
  studentCount: number;
  students: Student[];
}>;
