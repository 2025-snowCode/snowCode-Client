import type {AllUnitsResponse, SingleUnitResponse} from '@/models/course';

export const singleUnitResponse: SingleUnitResponse = {
  success: true,
  response: {
    id: 1,
    title: '날씨 데이터 확인하기',
    releaseDate: '2025-07-27',
    dueDate: '2025-07-27',
    assignmentCount: 4,
    assignments: [
      {
        id: 1,
        title: '날씨 데이터를 활용한 앱 만들기',
      },
      {
        id: 2,
        title: '날씨 데이터를 활용한 앱 만들기',
      },
      {
        id: 3,
        title: '날씨 데이터를 활용한 앱 만들기',
      },
      {
        id: 4,
        title: '날씨 데이터를 활용한 앱 만들기',
      },
    ],
  },
};

export const allUnitsResponse: AllUnitsResponse = {
  success: true,
  response: {
    count: 3,
    units: [
      {
        id: 1,
        title: '변수와 수식 (수정)',
        assignmentCount: 2,
      },
      {
        id: 2,
        title: '날씨 데이터 확인하기',
        assignmentCount: 1,
      },
      {
        id: 3,
        title: '날씨 데이터 확인하기',
        assignmentCount: 3,
      },
    ],
  },
};
