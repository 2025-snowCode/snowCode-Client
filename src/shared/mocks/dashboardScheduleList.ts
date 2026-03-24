import type {DashboardScheduleListResponse} from '@/entities/course/model/types';

export const responseScheduleList: DashboardScheduleListResponse = {
  success: true,
  response: {
    count: 4,
    schedule: [
      {
        date: '2025-07-20',
        remainingDays: 0,
        assignments: [
          {
            course: '데이터구조와 알고리즘',
            section: '002',
            assignment: 'final',
          },
        ],
      },
      {
        date: '2025-07-21',
        remainingDays: 1,
        assignments: [
          {
            course: '데이터구조와 알고리즘',
            section: '002',
            assignment: 'file',
          },
        ],
      },
      {
        date: '2025-07-22',
        remainingDays: 2,
        assignments: [
          {
            course: 'test',
            section: '003',
            assignment: '확인용',
          },
        ],
      },
      {
        date: '2025-07-26',
        remainingDays: 6,
        assignments: [
          {
            course: 'Python을 활용한 데이터 분석',
            section: '005',
            assignment: '날씨 데이터를 활용한 기온 변화 분석',
          },
          {
            course: '소프트웨어의이해',
            section: '005',
            assignment: '날씨 확인',
          },
        ],
      },
    ],
  },
};
