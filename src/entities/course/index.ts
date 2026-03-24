export { courseQueries } from '@/entities/course/api/courseQueries';
export { courseMutations } from '@/entities/course/api/courseMutations';
export {
  courseCoreSchema,
  courseBaseSchema,
  createCourseRequestSchema,
  courseOverviewSchema,
  dashboardCourseSchema,
  assignmentCourseSchema,
} from '@/entities/course/model/schemas';
export type {
  TCourseCore,
  TCourseBase,
  TCreateCourseRequest,
  TCourseOverview,
  TDashboardCourse,
  TAssignmentCourse,
} from '@/entities/course/model/schemas';
