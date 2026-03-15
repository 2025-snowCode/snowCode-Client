import type {z} from 'zod';
import type {ApiResponse} from '@/shared/model/types';
import {
  progressStatusSchema,
  studentProgressSchema,
  studentUnitSchema,
  studentSchema,
} from '@/entities/student/model/schemas';

export type ProgressStatus = z.infer<typeof progressStatusSchema>;
export type StudentProgress = z.infer<typeof studentProgressSchema>;
export type Unit = z.infer<typeof studentUnitSchema>;
export type Student = z.infer<typeof studentSchema>;

export type CourseStudentsResponse = ApiResponse<{
  id: number;
  title: string;
  section: string;
  unitCount: number;
  studentCount: number;
  students: Student[];
}>;
