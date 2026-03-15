import {submissionStatusSchema} from '@/shared/model/schemas';
import z from 'zod';

export const assignmentSchema = z.object({
  id: z.number(),
  title: z.string(),
  submittedStatus: submissionStatusSchema.optional(),
});

export const assignmentDetailsSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  count: z.number(),
  testcases: z.array(
    z.object({
      id: z.number(),
      testcase: z.string(),
      answer: z.string(),
    })
  ),
});

export const assignmentScheduleSchema = z.object({
  date: z.string(),
  remainingDays: z.number(),
  assignments: z.array(
    z.object({
      course: z.string(),
      section: z.string(),
      assignment: z.string(),
    })
  ),
});

export type TAssignment = z.infer<typeof assignmentSchema>;
export type TAssignmentSchedule = z.infer<typeof assignmentScheduleSchema>;
export type TAssignmentDetails = z.infer<typeof assignmentDetailsSchema>;
