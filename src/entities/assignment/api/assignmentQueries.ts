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
    }),

  // 전체 과제 목록 조회 쿼리 옵션
  getAllAssignments: () =>
    queryOptions({
      queryKey: ['assignments'],
      queryFn: getAllAssignments,
    }),

  // 강의별 과제 목록 조회 쿼리 옵션
  getAssignmentsByCourse: (courseId: number) =>
    queryOptions({
      queryKey: ['courses', courseId, 'assignments'],
      queryFn: () => getAssignmentsByCourse(courseId),
      enabled: !!courseId, // courseId가 있을 때만 쿼리 실행
    }),
};
