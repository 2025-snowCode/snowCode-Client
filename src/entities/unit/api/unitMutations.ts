import type {TUnitFormSchema} from '@/pages/create-unit/model/types';
import {createUnit, deleteUnit, updateUnit} from './unitApi';

export const unitMutations = {
  // 단원 추가 뮤테이션 옵션
  createUnit: {
    mutationKey: ['createUnit'],
    mutationFn: ({courseId, unit}: {courseId: number; unit: TUnitFormSchema}) =>
      createUnit(courseId, unit),
  },

  // 단원 수정 뮤테이션 옵션
  updateUnit: {
    mutationKey: ['updateUnit'],
    mutationFn: ({unitId, unit}: {unitId: number; unit: TUnitFormSchema}) =>
      updateUnit(unitId, unit),
  },

  // 단원 삭제 뮤테이션 옵션
  deleteUnit: {
    mutationKey: ['deleteUnit'],
    mutationFn: (unitId: number) => deleteUnit(unitId),
  },
};
