import {z} from 'zod';

export const progressStatusSchema = z.enum([
  'PASSED',
  'NOT_SUBMITTED',
  'PARTIAL',
  'FAILED',
]);

export const studentProgressSchema = z.object({
  status: progressStatusSchema,
  assignmentName: z.string().optional(),
  score: z.number().optional(),
  totalScore: z.number().optional(),
  plagiarismRate: z.number().optional(),
});

export const studentUnitSchema = z.object({
  id: z.number(),
  name: z.string(),
  title: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  assignments: z.array(studentProgressSchema),
});

export const studentSchema = z.object({
  id: z.number(),
  studentId: z.string(),
  name: z.string(),
  score: z.number(),
  totalScore: z.number(),
  progress: z.array(studentProgressSchema),
  units: z.array(studentUnitSchema).optional(),
});
