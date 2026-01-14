import type {
  Assignment,
  SemesterCode,
} from '@/components/admin/assignments/dummy/types';

// unit branch merge되면 삭제
interface UnitInfo {
  id: number;
  title: string;
  releaseDate: string;
  dueDate: string;
  isOpen?: boolean;
  assignmentCount: number;
  assignments: Assignment[];
}

interface CourseInfo {
  id: number;
  title: string;
  year: number;
  semester: SemesterCode;
  section: string;
  studentCount?: number;
  unitCount: number;
  units: UnitInfo[];
}

interface CourseResponse {
  success: boolean;
  response: CourseInfo;
}

export type {UnitInfo, CourseInfo, CourseResponse};
