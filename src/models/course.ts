import type {Assignment} from './assignment';
import type {ApiResponse} from './common';

// 학기 및 제출 상태 상수 타입 정의
export type SemesterCode = 'FIRST' | 'SECOND' | 'SUMMER' | 'WINTER';
export type SubmissionStatus = 'NOT_SUBMITTED' | 'CORRECT' | 'INCORRECT';

/**
 * 일정(Schedule) 인터페이스 정의
 */
export interface Schedule {
  date: string;
  remainingDays: number;
  assignments: {
    course: string;
    section: string;
    assignment: string;
  }[];
}

/**
 * 단원(Unit) 인터페이스 정의
 */
export interface Unit {
  id: number;
  title: string;
  releaseDate: string;
  dueDate: string;
  isOpen?: boolean;
  assignmentCount: number;
  assignments: Assignment[];
}

/**
 * 강의 기본 정보 인터페이스 정의
 */
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

/**
 * 대시보드 강의 목록용 인터페이스 정의
 * 기본 정보 + 강의 설명, 과제 개수
 */
export interface DashboardCourse extends BaseCourse {
  description: string;
  assignmentCount: number;
}

/**
 * 문제 선택 페이지용 강의 인터페이스 정의
 */
export interface AssignmentSelectCourse extends Omit<BaseCourse, 'unitCount'> {
  count: number;
  assignments: Pick<Assignment, 'id' | 'title'>[];
}

// 강의 상세 응답 타입 정의
export type CourseOverviewResponse = ApiResponse<CourseOverview>;

// 대시보드 강의 목록 응답 타입 정의
export type DashboardCourseListResponse = ApiResponse<{
  count: number;
  courses: DashboardCourse[];
}>;

// 대시보드 일정 목록 응답 타입 정의
export type DashboardScheduleListResponse = ApiResponse<{
  count: number;
  schedule: Schedule[];
}>;

// 문제 선택 페이지 응답 타입 정의
export type AssignmentSelectResponse = ApiResponse<{
  count: number;
  courses: AssignmentSelectCourse[];
}>;

// 강의 옵션 목록 응답 타입 정의
export type CourseOptionsResponse = ApiResponse<{
  count: number;
  courses: DashboardCourse[];
}>;

// 단원 조회-생성 페이지 응답 타입 정의 - 단일 단원
export type SingleUnitResponse = ApiResponse<Unit>;

// 단원 조회-생성 페이지 응답 타입 정의 - 전체 단원 목록
export type AllUnitsResponse = ApiResponse<{
  count: number;
  units: Pick<Unit, 'id' | 'title' | 'assignmentCount'>[];
}>;
