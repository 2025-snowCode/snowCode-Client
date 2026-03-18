export const mockAssignmentDetail = {
  success: true,
  response: {
    id: 1,
    title: '음수 구별하기',
    description:
      '정수 a를 입력 받고, a에 2를 더해준 값을 출력하는 프로그램을 작성해보세요.',
    count: 2,
    testcases: [
      {
        id: 3,
        testcase: '4',
        answer: '5',
      },
      {
        id: 4,
        testcase: '6',
        answer: '7',
      },
    ],
  },
};

export const mockSideBarCourse = {
  success: true,
  response: {
    id: 1,
    title: '소프트웨어의 이해',
    year: 2025,
    semester: 'FIRST',
    section: '005',
    unitCount: 12,
    units: [
      {
        id: 1,
        title: '변수와 수식',
        releaseDate: '2025-03-05',
        dueDate: '2025-03-11',
        isOpen: true,
        assignmentCount: 3,
        assignments: [
          {id: 1, title: '음수 구별하기', submittedStatus: 'CORRECT'},
          {
            id: 2,
            title: '변수 선언 후 값 출력해보기',
            submittedStatus: 'CORRECT',
          },
          {
            id: 3,
            title: '두 수의 합 계산하기',
            submittedStatus: 'NOT_SUBMITTED',
          },
        ],
      },
      {
        id: 2,
        title: '입출력과 연산자',
        releaseDate: '2025-03-12',
        dueDate: '2025-03-18',
        isOpen: true,
        assignmentCount: 2,
        assignments: [
          {
            id: 4,
            title: '입출력 프로그램 복습하기',
            submittedStatus: 'CORRECT',
          },
          {
            id: 5,
            title: '사칙연산 결과 출력하기',
            submittedStatus: 'INCORRECT',
          },
        ],
      },
      {
        id: 3,
        title: '조건문',
        releaseDate: '2025-03-19',
        dueDate: '2025-03-25',
        isOpen: true,
        assignmentCount: 4,
        assignments: [
          {id: 6, title: '홀짝 구별하기', submittedStatus: 'CORRECT'},
          {id: 7, title: '양수 음수 구별하기', submittedStatus: 'CORRECT'},
          {
            id: 8,
            title: '세 수 중 최댓값 구하기',
            submittedStatus: 'NOT_SUBMITTED',
          },
          {
            id: 9,
            title: '학점 계산 프로그램',
            submittedStatus: 'NOT_SUBMITTED',
          },
        ],
      },
      {
        id: 4,
        title: '반복문',
        releaseDate: '2025-03-26',
        dueDate: '2025-04-01',
        isOpen: true,
        assignmentCount: 3,
        assignments: [
          {id: 10, title: '1부터 N까지 합 구하기', submittedStatus: 'CORRECT'},
          {id: 11, title: '구구단 출력하기', submittedStatus: 'NOT_SUBMITTED'},
          {id: 12, title: '소수 판별하기', submittedStatus: 'NOT_SUBMITTED'},
        ],
      },
      {
        id: 5,
        title: '반복문과 조건문 응용',
        releaseDate: '2025-04-02',
        dueDate: '2025-04-08',
        isOpen: true,
        assignmentCount: 2,
        assignments: [
          {
            id: 13,
            title: '짝수와 음수 구별하기',
            submittedStatus: 'NOT_SUBMITTED',
          },
          {
            id: 14,
            title: '숫자 맞히기 프로그램 만들기',
            submittedStatus: 'NOT_SUBMITTED',
          },
        ],
      },
      {
        id: 6,
        title: '함수',
        releaseDate: '2025-04-09',
        dueDate: '2025-04-15',
        isOpen: false,
        assignmentCount: 3,
        assignments: [
          {
            id: 15,
            title: '함수로 사칙연산 구현하기',
            submittedStatus: 'NOT_SUBMITTED',
          },
          {
            id: 16,
            title: '재귀함수로 팩토리얼 구하기',
            submittedStatus: 'NOT_SUBMITTED',
          },
          {
            id: 17,
            title: '피보나치 수열 출력하기',
            submittedStatus: 'NOT_SUBMITTED',
          },
        ],
      },
      {
        id: 7,
        title: '리스트와 튜플',
        releaseDate: '2025-04-16',
        dueDate: '2025-04-22',
        isOpen: false,
        assignmentCount: 4,
        assignments: [
          {
            id: 18,
            title: '리스트 요소 합 구하기',
            submittedStatus: 'NOT_SUBMITTED',
          },
          {id: 19, title: '리스트 정렬하기', submittedStatus: 'NOT_SUBMITTED'},
          {
            id: 20,
            title: '튜플로 좌표 표현하기',
            submittedStatus: 'NOT_SUBMITTED',
          },
          {
            id: 21,
            title: '리스트에서 최댓값 최솟값 찾기',
            submittedStatus: 'NOT_SUBMITTED',
          },
        ],
      },
      {
        id: 8,
        title: '딕셔너리와 집합',
        releaseDate: '2025-04-23',
        dueDate: '2025-04-29',
        isOpen: false,
        assignmentCount: 2,
        assignments: [
          {
            id: 22,
            title: '딕셔너리로 성적 관리하기',
            submittedStatus: 'NOT_SUBMITTED',
          },
          {
            id: 23,
            title: '집합으로 중복 제거하기',
            submittedStatus: 'NOT_SUBMITTED',
          },
        ],
      },
      {
        id: 9,
        title: '문자열 처리',
        releaseDate: '2025-04-30',
        dueDate: '2025-05-07',
        isOpen: false,
        assignmentCount: 3,
        assignments: [
          {id: 24, title: '문자열 뒤집기', submittedStatus: 'NOT_SUBMITTED'},
          {id: 25, title: '단어 빈도수 세기', submittedStatus: 'NOT_SUBMITTED'},
          {
            id: 26,
            title: '팰린드롬 판별하기',
            submittedStatus: 'NOT_SUBMITTED',
          },
        ],
      },
      {
        id: 10,
        title: '파일 입출력',
        releaseDate: '2025-05-08',
        dueDate: '2025-05-14',
        isOpen: false,
        assignmentCount: 2,
        assignments: [
          {
            id: 27,
            title: '파일 읽고 단어 수 세기',
            submittedStatus: 'NOT_SUBMITTED',
          },
          {
            id: 28,
            title: '성적 데이터 파일로 저장하기',
            submittedStatus: 'NOT_SUBMITTED',
          },
        ],
      },
      {
        id: 11,
        title: '클래스와 객체',
        releaseDate: '2025-05-15',
        dueDate: '2025-05-21',
        isOpen: false,
        assignmentCount: 4,
        assignments: [
          {
            id: 29,
            title: '학생 클래스 만들기',
            submittedStatus: 'NOT_SUBMITTED',
          },
          {
            id: 30,
            title: '은행 계좌 클래스 구현하기',
            submittedStatus: 'NOT_SUBMITTED',
          },
          {
            id: 31,
            title: '상속으로 동물 클래스 확장하기',
            submittedStatus: 'NOT_SUBMITTED',
          },
          {
            id: 32,
            title: '클래스 메서드로 통계 계산하기',
            submittedStatus: 'NOT_SUBMITTED',
          },
        ],
      },
      {
        id: 12,
        title: '종합 실습 프로젝트',
        releaseDate: '2025-05-22',
        dueDate: '2025-05-28',
        isOpen: false,
        assignmentCount: 3,
        assignments: [
          {
            id: 33,
            title: '간단한 계산기 프로그램 만들기',
            submittedStatus: 'NOT_SUBMITTED',
          },
          {
            id: 34,
            title: '학생 성적 관리 시스템 구현하기',
            submittedStatus: 'NOT_SUBMITTED',
          },
          {
            id: 35,
            title: '텍스트 기반 퀴즈 게임 만들기',
            submittedStatus: 'NOT_SUBMITTED',
          },
        ],
      },
    ],
  },
};

export const tcPassResponse = {
  success: true,
  response: {
    isSuccess: true,
    totalCount: 10,
    passCount: 10,
    failedTestCase: {
      testCaseId: 0,
      expected: null,
    },
  },
};

export const tcFailResponse = {
  success: true,
  response: {
    isSuccess: false,
    totalCount: 10,
    passCount: 3,
    failedTestCase: {
      testCaseId: 4,
      expected: '42',
    },
  },
};
