import type {
  AssignmentSelectResponse,
  CourseOptionsResponse,
} from '@/models/course';

export const response: AssignmentSelectResponse = {
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
            title: '날씨 데이터로 크롤링하기 1',
          },
          {
            id: 3,
            title: '날씨 데이터로 크롤링하기 2',
          },
          {
            id: 7,
            title: '날씨 데이터로 크롤링하기 3',
          },
          {
            id: 8,
            title: '날씨 데이터로 크롤링하기 4',
          },
        ],
      },
      {
        id: 2,
        title: '데이터구조와 알고리즘',
        year: 2025,
        semester: 'SECOND',
        section: '003',
        count: 2,
        assignments: [
          {
            id: 2,
            title: '날씨 데이터로 크롤링하기 5',
          },
          {
            id: 4,
            title: '날씨 데이터로 크롤링하기 6',
          },
          {
            id: 5,
            title: '날씨 데이터로 크롤링하기 7',
          },
          {
            id: 6,
            title: '날씨 데이터로 크롤링하기 8',
          },
        ],
      },
    ],
  },
};

export const courseOptionsResponse: CourseOptionsResponse = {
  success: true,
  response: {
    count: 3,
    courses: [
      {
        id: 1,
        year: 2025,
        semester: 'SUMMER',
        section: '001',
        title: '소프트웨어의이해',
        description: '소프트웨어의이해 강의는 파이썬을 배웁니다.',
        unitCount: 3,
        assignmentCount: 10,
      },
      {
        id: 2,
        year: 2025,
        semester: 'SUMMER',
        section: '001',
        title: '소프트웨어의이해',
        description: '소프트웨어의이해 강의는 파이썬을 배웁니다.',
        unitCount: 3,
        assignmentCount: 10,
      },
      {
        id: 3,
        year: 2025,
        semester: 'SUMMER',
        section: '001',
        title: '소프트웨어의이해',
        description: '소프트웨어의이해 강의는 파이썬을 배웁니다.',
        unitCount: 3,
        assignmentCount: 10,
      },
    ],
  },
};
