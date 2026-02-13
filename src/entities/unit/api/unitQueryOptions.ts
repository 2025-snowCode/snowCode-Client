import {queryOptions} from '@tanstack/react-query';
import {createUnit, getAllUnitsByCourseId, getUnitById} from './unitApi';
import type {TUnitFormSchema} from '@/pages/create-unit/model/types';

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
    enabled: !!unitId && unitId !== -1, // unitId가 null이거나 -1인 경우 쿼리 비활성화
  });
}

export function createUnitQueryOptions(
  courseId: number,
  unit: TUnitFormSchema
) {
  return queryOptions({
    queryKey: ['createUnit', courseId, unit],
    queryFn: () => createUnit(courseId, unit),
  });
}
