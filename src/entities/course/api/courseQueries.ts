import {getAllCourses, getCourseById} from './courseApi';
import {queryOptions} from '@tanstack/react-query';

export const courseQueries = {
  // 전체 강의 조회 쿼리 옵션
  getAllCourses: () =>
    queryOptions({
      queryKey: ['courses'],
      queryFn: getAllCourses,
      select: (data) => ({
        courseCount: data.response.count,
        courses: data.response.courses,
      }),
    }),

  // 단일 강의 조회 쿼리 옵션
  getCourseDetails: (courseId: number) =>
    queryOptions({
      queryKey: ['courses', 'detail', courseId],
      queryFn: () => getCourseById(courseId),
      select: (data) => data.response,
    }),
};
