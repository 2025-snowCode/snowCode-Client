import type { CourseStudentsResponse } from './types';

const mockCourseStudents: CourseStudentsResponse = {
  success: true,
  response: {
    id: 1,
    title: "소프트웨어의 이해",
    section: "005",
    unitCount: 5,
    studentCount: 2,
    students: [
      {
        id: 1,
        studentId: "2210456",
        name: "백수민",
        score: 8,
        totalScore: 20,
        progress: [
          { status: "PASSED" },
          { status: "NOT_SUBMITTED" },
          { status: "PARTIAL" },
          { status: "FAILED" },
          { status: "NOT_SUBMITTED" },
        ]
      },
      {
        id: 2,
        studentId: "2313398",
        name: "주아정",
        score: 20,
        totalScore: 20,
        progress: [
          { status: "PASSED" },
          { status: "PASSED" },
          { status: "PASSED" },
          { status: "PASSED" },
          { status: "PASSED" },
        ]
      },
    ]
  }
};

export default mockCourseStudents