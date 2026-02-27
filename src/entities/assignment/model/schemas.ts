import {submissionStatusSchema} from '@/shared/model/schemas';
import z from 'zod';

export const assignmentSchema = z.object({
  id: z.number(),
  title: z.string(),
  submittedStatus: submissionStatusSchema.optional(),
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
