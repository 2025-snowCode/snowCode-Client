import {z} from 'zod';
import {
  apiResponseSchema,
  semesterCodeSchema,
  submissionStatusSchema,
} from './schemas';

/**
 * API 공통 응답 타입
 */
export type ApiResponse<T> = z.infer<
  ReturnType<typeof apiResponseSchema<z.ZodType<T>>>
>;

export type UserType = 'admin' | 'student' | 'guest'; // UserType은 스키마가 현재 없음

export type SemesterCode = z.infer<typeof semesterCodeSchema>;
export type SubmissionStatus = z.infer<typeof submissionStatusSchema>;
