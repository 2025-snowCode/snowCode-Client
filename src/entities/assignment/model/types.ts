import type {z} from 'zod';
import type {assignmentScheduleSchema, assignmentSchema} from './schemas';

export type Assignment = z.infer<typeof assignmentSchema>;
export type AssignmentSchedule = z.infer<typeof assignmentScheduleSchema>;
