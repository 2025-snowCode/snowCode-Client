import type {z} from 'zod';
import type {
  courseOverviewSchema,
  dashboardCourseSchema,
  assignmentSelectCourseSchema,
  scheduleSchema,
} from './schemas';
export type {Unit} from '@/entities/unit/model/types';

export type Schedule = z.infer<typeof scheduleSchema>;
export type CourseOverview = z.infer<typeof courseOverviewSchema>;
export type DashboardCourse = z.infer<typeof dashboardCourseSchema>;
export type AssignmentSelectCourse = z.infer<
  typeof assignmentSelectCourseSchema
>;
