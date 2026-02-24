import {getAllCourses} from './courseApi';
import {queryOptions} from '@tanstack/react-query';

export const courseQueries = {
  // 전체 강의 조회 쿼리 옵션
  getAllCourses: () =>
    queryOptions({
      queryKey: ['courses'],
      queryFn: getAllCourses,
    }),
};
