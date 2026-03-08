/**
 * API 공통 응답 타입
 */

export interface ApiResponse<T> {
  success: boolean;
  response: T;
}

export type UserType = 'admin' | 'student' | 'guest';
export type SemesterCode = 'FIRST' | 'SECOND' | 'SUMMER' | 'WINTER';
export type SubmissionStatus = 'NOT_SUBMITTED' | 'CORRECT' | 'INCORRECT';
