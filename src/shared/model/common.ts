/**
 * API 공통 응답 타입
 */

export interface ApiResponse<T> {
  success: boolean;
  response: T;
}

export type UserType = 'admin' | 'student' | 'guest';

// 학기 및 제출 상태 상수 타입 정의
export type SemesterCode = 'FIRST' | 'SECOND' | 'SUMMER' | 'WINTER';
export type SubmissionStatus = 'NOT_SUBMITTED' | 'CORRECT' | 'INCORRECT';
