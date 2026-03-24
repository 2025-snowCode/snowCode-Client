import type {EnrollmentList, StudentDetail} from '@/entities/student/model/types';

export const mockEnrollmentList: EnrollmentList = {
  id: 1,
  title: '소프트웨어의 이해',
  section: '005',
  unitCount: 5,
  studentCount: 2,
  students: [
    {
      id: 1,
      studentId: '2210456',
      name: '백수민',
      score: 35,
      totalScore: 70,
      progress: [
        {status: 'PASSED'},
        {status: 'NOT_SUBMITTED'},
        {status: 'PARTIAL'},
        {status: 'FAILED'},
        {status: 'NOT_SUBMITTED'},
      ],
    },
    {
      id: 2,
      studentId: '2313398',
      name: '주아정',
      score: 80,
      totalScore: 80,
      progress: [
        {status: 'PASSED'},
        {status: 'PASSED'},
        {status: 'PASSED'},
        {status: 'PASSED'},
        {status: 'PASSED'},
      ],
    },
  ],
};

export const mockStudentDetail: StudentDetail = {
  id: 1,
  name: '백수민',
  studentId: '2210456',
  email: 'bsm@example.com',
  title: '소프트웨어의 이해',
  score: 35,
  totalScore: 70,
  unitCount: 2,
  progress: [
    {status: 'PASSED'},
    {status: 'NOT_SUBMITTED'},
    {status: 'PARTIAL'},
    {status: 'FAILED'},
    {status: 'NOT_SUBMITTED'},
  ],
  units: [
    {
      id: 1,
      title: '변수와 수식',
      releaseDate: '2025.06.19',
      dueDate: '2025.06.25',
      isOpen: true,
      assignmentCount: 4,
      assignments: [
        {id: 1, title: '음수 구별하기', isCorrect: false, score: 4, totalScore: 10, submittedCodeId: 101},
        {id: 2, title: '변수 선언 후 값 출력해보기', isCorrect: true, score: 9, totalScore: 10, submittedCodeId: 102},
        {id: 3, title: '수식 작성 및 결과 확인 실습 과제', isCorrect: true, score: 1, totalScore: 10, submittedCodeId: 103},
        {id: 4, title: '변수에 수식 결과를 저장해보세요', isCorrect: false, score: 6, totalScore: 10, submittedCodeId: 104},
      ],
    },
    {
      id: 2,
      title: '조건문과 반복문',
      releaseDate: '2025.06.26',
      dueDate: '2025.07.02',
      isOpen: true,
      assignmentCount: 3,
      assignments: [
        {id: 5, title: 'if문으로 홀짝 구분하기', isCorrect: false, score: 0, totalScore: 10, submittedCodeId: 0},
        {id: 6, title: 'for문으로 1~10 출력하기', isCorrect: false, score: 0, totalScore: 10, submittedCodeId: 0},
        {id: 7, title: 'while문 활용 실습', isCorrect: false, score: 0, totalScore: 10, submittedCodeId: 0},
      ],
    },
  ],
};
