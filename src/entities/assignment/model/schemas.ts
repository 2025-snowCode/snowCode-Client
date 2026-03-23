import {submissionStatusSchema} from '@/shared/model/schemas';
import z from 'zod';

export const assignmentSchema = z.object({
  id: z.number(),
  title: z.string(),
  submittedStatus: submissionStatusSchema.optional(),
  codeId: z.number().optional(),
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

export const assignmentFormSchema = z.object({
  title: z.string(),
  score: z.number(),
  description: z.string(),
  testcases: z.array(
    z.object({
      testcase: z.string(),
      answer: z.string(),
      isPublic: z.boolean(),
    })
  ),
});

export const assignmentDetailSchema = z.object({
  id: z.number(),
  title: z.string(),
  score: z.number().optional(),
  description: z.string(),
  count: z.number(),
  testcases: z.array(
    z.object({
      id: z.number(),
      testcase: z.string(),
      answer: z.string(),
      isPublic: z.boolean(),
    })
  ),
});

export const assignmentSubmissionResultSchema = z.object({
  codeId: z.number(),
  isSuccess: z.boolean(),
  totalScore: z.number(),
  totalCount: z.number(),
  passCount: z.number(),
  failedTestCase: z.object({
    testcaseId: z.number(),
    actual: z.string().nullable(),
    expected: z.string().nullable(),
  }),
});

export const assignmentCodeSchema = z.object({
  id: z.number(),
  code: z.string(),
  language: z.string(),
});

export type TAssignment = z.infer<typeof assignmentSchema>;
export type TAssignmentSchedule = z.infer<typeof assignmentScheduleSchema>;
export type TAssignmentForm = z.infer<typeof assignmentFormSchema>;
export type TAssignmentDetail = z.infer<typeof assignmentDetailSchema>;
export type TAssignmentSubmissionResult = z.infer<
  typeof assignmentSubmissionResultSchema
>;
