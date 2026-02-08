import type {DashboardCourseListResponse} from '@/models/course';

export const responseCourseList: DashboardCourseListResponse = {
  success: true,
  response: {
    count: 2,
    courses: [
      {
        id: 1,
        year: 2025,
        semester: 'FIRST',
        section: '005',
        title: '소프트웨어의 이해',
        description:
          'Python 언어를 기반으로 하여 프로그래밍에 대한 기본 원리를 학습한다.',
        unitCount: 3,
        assignmentCount: 2,
      },
      {
        id: 2,
        year: 2025,
        semester: 'FIRST',
        section: '005',
        title: '소프트웨어의 이해',
        description:
          'Python 언어를 기반으로 하여 프로그래밍에 대한 기본 원리를 학습한다.',
        unitCount: 3,
        assignmentCount: 2,
      },
    ],
  },
};
