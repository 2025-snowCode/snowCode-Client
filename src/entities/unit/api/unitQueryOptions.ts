import {queryOptions} from '@tanstack/react-query';
import {getAllUnitsByCourseId, getUnitById} from './unitApi';

// 강의별 전체 단원 조회 쿼리 옵션
export function allUnitsQueryOptions(courseId: number) {
  return queryOptions({
    queryKey: ['units', courseId],
    queryFn: () => getAllUnitsByCourseId(courseId),
  });
}

// 단일 단원 조회 쿼리 옵션
export function unitQueryOptions(unitId: number | null) {
  return queryOptions({
    queryKey: ['unit', unitId],
    queryFn: () => getUnitById(unitId),
    enabled: !!unitId,
  });
}
