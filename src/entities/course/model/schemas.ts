import {z} from 'zod';
import {semesterCodeSchema} from '@/shared/model/schemas';
import {
  assignmentSchema,
  assignmentScheduleSchema,
} from '@/entities/assignment/model/schemas';
import {unitSchema} from '@/entities/unit/model/schemas';

export const courseOverviewSchema = z.object({
  id: z.number(),
  title: z.string(),
  year: z.number(),
  semester: semesterCodeSchema,
  section: z.string(),
  unitCount: z.number(),
  studentCount: z.number().optional(),
  units: z.array(unitSchema),
});

export const dashboardCourseSchema = z.object({
  id: z.number(),
  title: z.string(),
  year: z.number(),
  semester: semesterCodeSchema,
  section: z.string(),
  unitCount: z.number(),
  description: z.string(),
  assignmentCount: z.number(),
});

export const assignmentCourseSchema = z.object({
  id: z.number(),
  title: z.string(),
  year: z.number(),
  semester: semesterCodeSchema,
  section: z.string(),
  count: z.number(),
  assignments: z.array(assignmentSchema.pick({id: true, title: true})),
});

export {assignmentScheduleSchema as scheduleSchema};
