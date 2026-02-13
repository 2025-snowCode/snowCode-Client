import {queryOptions} from '@tanstack/react-query';
import {getAllUnitsByCourseId, getUnitById} from './unitApi';

export const unitQueries = {
  // 강의별 전체 단원 조회 쿼리 옵션
  getUnitList: (courseId: number) =>
    queryOptions({
      queryKey: ['unit', courseId],
      queryFn: () => getAllUnitsByCourseId(courseId),
    }),

  // 단일 단원 조회 쿼리 옵션
  getUnitDetails: (unitId: number | null) =>
    queryOptions({
      queryKey: ['unit', unitId],
      queryFn: () => getUnitById(unitId),
      enabled: !!unitId && unitId !== -1,
    }),
};
