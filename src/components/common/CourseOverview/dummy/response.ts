import type {CourseResponse} from './types';

export const courseResponse: CourseResponse = {
  success: true,
  response: {
    id: 1,
    title: '소프트웨어의 이해',
    year: 2025,
    semester: 'FIRST',
    section: '005',
    studentCount: 56,
    unitCount: 2,
    units: [
      {
        id: 1,
        title: '변수와 수식',
        releaseDate: '2025-06-19',
        dueDate: '2025-06-25',
        isOpen: true,
        assignmentCount: 2,
        assignments: [
          {
            id: 1,
            title: '음수 구별하기',
            submittedStatus: 'CORRECT',
          },
          {
            id: 2,
            title: '수식 작성 및 결과 확인 실습 과제',
            submittedStatus: 'CORRECT',
          },
          {
            id: 3,
            title: '변수 선언 후 값 출력해보기',
            submittedStatus: 'NOT_SUBMITTED',
          },
          {
            id: 4,
            title: '변수 수식 결과를 저장해보세요',
            submittedStatus: 'INCORRECT',
          },
        ],
      },
      {
        id: 3,
        title: '반복문과 조건문',
        releaseDate: '2025-06-19',
        dueDate: '2025-06-25',
        isOpen: false,
        assignmentCount: 2,
        assignments: [
          {
            id: 4,
            title: '짝수와 음수 구별하기',
            submittedStatus: 'NOT_SUBMITTED',
          },
          {
            id: 5,
            title: '숫자 맞히기 프로그램 만들기 실습',
            submittedStatus: 'NOT_SUBMITTED',
          },
        ],
      },
    ],
  },
};
