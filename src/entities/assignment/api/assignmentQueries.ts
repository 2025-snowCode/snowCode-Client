import {queryOptions} from '@tanstack/react-query';
import {
  getAllAssignments,
  getAssignmentCode,
  getAssignmentDetails,
  getAssignmentsByCourse,
  getAssignmentSchedules,
} from '@/entities/assignment/api/assignmentApi';

export const assignmentQueries = {
  // 과제 일정 조회 쿼리 옵션
  getAssignmentSchedules: () =>
    queryOptions({
      queryKey: ['schedules'],
      queryFn: getAssignmentSchedules,
      select: (data) => ({
        scheduleCount: data.count,
        schedules: data.schedule,
      }),
    }),

  // 단일 과제 상세 조회 쿼리 옵션
  getAssignmentDetails: (assignmentId: number) =>
    queryOptions({
      queryKey: ['assignments', assignmentId],
      queryFn: () => getAssignmentDetails(assignmentId),
      enabled: !!assignmentId,
    }),

  // 전체 과제 목록 조회 쿼리 옵션
  getAllAssignments: () =>
    queryOptions({
      queryKey: ['assignments'],
      queryFn: getAllAssignments,
      select: (data) => data.assignments,
    }),

  // 강의별 과제 목록 조회 쿼리 옵션
  getAssignmentsByCourse: (courseId: number) =>
    queryOptions({
      queryKey: ['courses', courseId, 'assignments'],
      queryFn: () => getAssignmentsByCourse(courseId),
      enabled: !!courseId,
      select: (data) => data.courses.flatMap((course) => course.assignments),
    }),

  // 과제 코드 조회 쿼리 옵션
  getAssignmentCode: (codeId: number) =>
    queryOptions({
      queryKey: ['code', codeId],
      queryFn: () => getAssignmentCode(codeId),
      enabled: !!codeId,
    }),
};
