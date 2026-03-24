import type {z} from 'zod';
import {
  progressStatusSchema,
  studentProgressSchema,
  studentUnitSchema,
  studentUnitAssignmentSchema,
  studentSchema,
  studentDetailSchema,
  enrollmentListSchema,
} from '@/entities/student/model/schemas';

export type ProgressStatus = z.infer<typeof progressStatusSchema>;
export type StudentProgress = z.infer<typeof studentProgressSchema>;
export type StudentUnitAssignment = z.infer<typeof studentUnitAssignmentSchema>;
export type StudentUnit = z.infer<typeof studentUnitSchema>;
export type Student = z.infer<typeof studentSchema>;
export type StudentDetail = z.infer<typeof studentDetailSchema>;
export type EnrollmentList = z.infer<typeof enrollmentListSchema>;
