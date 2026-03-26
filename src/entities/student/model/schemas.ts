import {z} from 'zod';

export const progressStatusSchema = z.string();

export const studentProgressSchema = z.object({
  status: progressStatusSchema,
  // assignmentName: z.string().optional(),
  // score: z.number().optional(),
  // totalScore: z.number().optional(),
  // plagiarismRate: z.number().optional(),
});

// 개별 학생 조회 units 안의 assignments 스키마
export const studentUnitAssignmentSchema = z.object({
  id: z.number(),
  title: z.string(),
  isCorrect: z.boolean(),
  score: z.number(),
  totalScore: z.number(),
  submittedCodeId: z.number(),
});

// 개별 학생 조회용 unit 스키마 (API 필드명 기준)
export const studentUnitSchema = z.object({
  id: z.number(),
  title: z.string(),
  releaseDate: z.string(),
  dueDate: z.string(),
  isOpen: z.boolean(),
  assignmentCount: z.number(),
  assignments: z.array(studentUnitAssignmentSchema),
});

// 목록 조회용 학생 스키마
export const studentSchema = z.object({
  id: z.number(),
  studentId: z.string(),
  name: z.string(),
  score: z.number(),
  totalScore: z.number(),
  progress: z.array(studentProgressSchema),
});

// 개별 학생 조회용 스키마
export const studentDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  studentId: z.string(),
  email: z.string(),
  title: z.string(),
  score: z.number(),
  totalScore: z.number(),
  unitCount: z.number(),
  progress: z.array(studentProgressSchema),
  units: z.array(studentUnitSchema),
});

// 목록 조회 response 전체 스키마
export const enrollmentListSchema = z.object({
  id: z.number(),
  title: z.string(),
  section: z.string(),
  unitCount: z.number(),
  studentCount: z.number(),
  students: z.array(studentSchema),
});

export type TStudent = z.infer<typeof studentSchema>;
export type TEnrollmentList = z.infer<typeof enrollmentListSchema>;
