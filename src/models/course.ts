import type {ApiResponse} from './common';

// 학기 및 제출 상태 상수 타입 정의
export type SemesterCode = 'FIRST' | 'SECOND' | 'SUMMER' | 'WINTER';
export type SubmissionStatus = 'NOT_SUBMITTED' | 'CORRECT' | 'INCORRECT';

// 과제(Assignment) 인터페이스 정의
export interface Assignment {
  id: number;
  title: string;
  submittedStatus: SubmissionStatus;
}

// 단원(Unit) 인터페이스 정의
export interface Unit {
  id: number;
  title: string;
  releaseDate: string;
  dueDate: string;
  isOpen?: boolean;
  assignmentCount: number;
  assignments: Assignment[];
}

// 베이스 강의(Course) 인터페이스 정의 (공통 필드)
export interface BaseCourse {
  id: number;
  title: string;
  year: number;
  semester: SemesterCode;
  section: string;
  unitCount: number;
}

/**
 * 강의 상세 페이지용 (course-overview) 인터페이스 정의
 * 기본 정보 + 단원, 과제 상세 리스트
 */
export interface CourseOverview extends BaseCourse {
  studentCount?: number;
  units: Unit[];
}

export type CourseOverviewResponse = ApiResponse<CourseOverview>;
