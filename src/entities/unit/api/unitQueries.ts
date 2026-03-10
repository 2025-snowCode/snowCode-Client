import {queryOptions, skipToken} from '@tanstack/react-query';
import {getAllUnitsByCourseId, getUnitById} from './unitApi';

export const unitQueries = {
  // 강의별 전체 단원 조회 쿼리 옵션
  getUnitList: (courseId: number) =>
    queryOptions({
      queryKey: ['units', courseId],
      queryFn: () => getAllUnitsByCourseId(courseId),
      select: (data) => ({
        unitList: data.response.units,
        unitCount: data.response.count,
        firstUnitId: data.response.units[0]?.id ?? null,
      }),
    }),

  // 단일 단원 조회 쿼리 옵션
  getUnitDetails: (unitId: number | null) =>
    queryOptions({
      queryKey: ['units', 'detail', unitId],
      queryFn: unitId ? () => getUnitById(unitId) : skipToken,
      select: (data) => {
        return data.response;
      },
    }),
};
