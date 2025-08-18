import type {UnitResponse} from './types';

export const unit: UnitResponse = {
  success: true,
  response: {
    id: 1,
    title: '날씨 데이터 확인하기',
    releaseDate: '2025-07-27',
    dueDate: '2025-07-27',
    assignmentCount: 2,
    assignments: [
      {
        id: 1,
        title: '날씨 데이터를 활용한 앱 만들기',
      },
      {
        id: 2,
        title: '날씨 데이터를 활용한 앱 만들기',
      },
    ],
  },
};
