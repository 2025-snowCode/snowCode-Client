import type {SemesterCode} from '../../admin/assignments/dummy/types';

type UserType = 'admin' | 'student';

interface Schedule {
  id: number;
  date: Date;
  remainingDays: number;
  assignments: Assignment[];
}

interface Assignment {
  id: number;
  course: string;
  section: string;
  assignment: string;
}

interface Course {
  id: number;
  year: number;
  semester: SemesterCode;
  section: string;
  title: string;
  description: string;
  unitCount: number;
  assignmentCount: number;
}

export type {Course, Schedule, Assignment, UserType};
