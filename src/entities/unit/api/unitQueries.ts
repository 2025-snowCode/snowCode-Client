import {queryOptions, skipToken} from '@tanstack/react-query';
import {getAllUnitsByCourseId, getUnitById} from '@/entities/unit/api/unitApi';

export const unitQueries = {
  // 강의별 전체 단원 조회 쿼리 옵션
  getUnitList: (courseId: number) =>
    queryOptions({
      queryKey: ['units', courseId],
      queryFn: () => getAllUnitsByCourseId(courseId),
      select: (data) => ({
        unitList: data.units,
        unitCount: data.count,
        firstUnitId: data.units[0]?.id ?? null,
      }),
    }),

  // 단일 단원 조회 쿼리 옵션
  getUnitDetail: (unitId: number | null) =>
    queryOptions({
      queryKey: ['units', 'detail', unitId],
      queryFn: unitId ? () => getUnitById(unitId) : skipToken,
    }),
};
