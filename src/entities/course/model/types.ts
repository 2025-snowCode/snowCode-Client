import {z} from 'zod';
import {
  courseCoreSchema,
  courseBaseSchema,
  createCourseRequestSchema,
  courseOverviewSchema,
  dashboardCourseSchema,
  assignmentCourseSchema,
} from '@/entities/course/model/schemas';
import {assignmentScheduleSchema} from '@/entities/assignment/model/schemas';

export type TCourseCore = z.infer<typeof courseCoreSchema>;
export type TCourseBase = z.infer<typeof courseBaseSchema>;
export type TCreateCourseRequest = z.infer<typeof createCourseRequestSchema>;
export type TCourseOverview = z.infer<typeof courseOverviewSchema>;
export type TDashboardCourse = z.infer<typeof dashboardCourseSchema>;
export type TAssignmentCourse = z.infer<typeof assignmentCourseSchema>;
export type TSchedule = z.infer<typeof assignmentScheduleSchema>;
