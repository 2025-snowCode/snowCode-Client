import type {CoursesResponse} from './types';

export const coursesResponse: CoursesResponse = {
  success: true,
  response: {
    count: 2,
    courses: [
      {
        id: 1,
        title: '데이터구조와 알고리즘',
        year: 2025,
        semester: 'FIRST',
        section: '002',
        count: 2,
        assignments: [
          {
            id: 1,
            title: '날씨 데이터로 크롤링하기',
          },
          {
            id: 3,
            title: '날씨 데이터로 크롤링하기',
          },
        ],
      },
      {
        id: 2,
        title: '컴퓨터수학',
        year: 2025,
        semester: 'SECOND',
        section: '003',
        count: 2,
        assignments: [
          {
            id: 2,
            title: '날씨 데이터로 크롤링하기',
          },
          {
            id: 4,
            title: '날씨 데이터로 크롤링하기',
          },
        ],
      },
    ],
  },
};
