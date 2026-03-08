import {queryOptions} from '@tanstack/react-query';
import {
  getAllAssignments,
  getAssignmentsByCourse,
  getAssignmentSchedules,
} from './assignmentApi';

export const assignmentQueries = {
  // 과제 일정 조회 쿼리 옵션
  getAssignmentSchedules: () =>
    queryOptions({
      queryKey: ['schedules'],
      queryFn: getAssignmentSchedules,
      select: (data) => ({
        scheduleCount: data.response.count,
        schedules: data.response.schedule,
      }),
    }),

  // 전체 과제 목록 조회 쿼리 옵션
  getAllAssignments: () =>
    queryOptions({
      queryKey: ['assignments'],
      queryFn: getAllAssignments,
      select: (data) => data.response.assignments,
    }),

  // 강의별 과제 목록 조회 쿼리 옵션
  getAssignmentsByCourse: (courseId: number) =>
    queryOptions({
      queryKey: ['courses', courseId, 'assignments'],
      queryFn: () => getAssignmentsByCourse(courseId),
      enabled: !!courseId,
      select: (data) =>
        data.response.courses.flatMap((course) => course.assignments),
    }),
};
