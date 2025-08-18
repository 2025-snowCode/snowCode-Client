import type {UnitListResponse} from './types';

export const allUnits: UnitListResponse = {
  success: true,
  response: {
    count: 3,
    units: [
      {
        id: 1,
        title: '변수와 수식 (수정)',
        assignmentCount: 0,
      },
      {
        id: 2,
        title: '날씨 데이터 확인하기',
        assignmentCount: 0,
      },
      {
        id: 3,
        title: '날씨 데이터 확인하기',
        assignmentCount: 0,
      },
    ],
  },
};
