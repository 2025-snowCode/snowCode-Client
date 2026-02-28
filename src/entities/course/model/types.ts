import type {z} from 'zod';
import type {
  courseOverviewSchema,
  dashboardCourseSchema,
  assignmentCourseSchema,
} from './schemas';

export type CourseOverview = z.infer<typeof courseOverviewSchema>;
export type DashboardCourse = z.infer<typeof dashboardCourseSchema>;
export type AssignmentCourse = z.infer<typeof assignmentCourseSchema>;
