import {
  createCourse,
  deleteCourse,
  updateCourse,
} from '@/entities/course/api/courseApi';
import type {TCourseBase} from '@/entities/course/model/schemas';
import {
  addEnrollment,
  getEnrollments,
} from '@/entities/student/api/studentApi';

export const courseMutations = {
  // 강의 개설 (학생 등록 확인 로직 포함)
  createCourse: {
    mutationKey: ['createCourse'],
    mutationFn: async (
      payload: Parameters<typeof createCourse>[0]
    ): Promise<{course: TCourseBase; failedIds: string[]}> => {
      const course = await createCourse(payload);
      const students = payload.students ?? [];

      if (students.length === 0) return {course, failedIds: []};

      try {
        const enrollments = await getEnrollments(course.id, {
          page: 0,
          pageSize: 1000,
        });
        const enrolledStudentIds = new Set(
          enrollments.response.students.map((s) => String(s.studentId))
        );

        const missingStudents = students.filter(
          ({studentId}) => !enrolledStudentIds.has(String(studentId))
        );

        const results = await Promise.allSettled(
          missingStudents.map(({studentId}) =>
            addEnrollment(course.id, String(studentId))
          )
        );

        const failedIds = results
          .map((result, index) =>
            result.status === 'rejected'
              ? String(missingStudents[index].studentId)
              : null
          )
          .filter((id): id is string => id !== null);

        return {course, failedIds};
      } catch {
        // 등록 확인 실패 시에도 강의 생성 성공은 유지
        return {course, failedIds: students.map(({studentId}) => String(studentId))};
      }
    },
  },

  // 강의 수정 (학생 등록 확인 로직 포함)
  updateCourse: (courseId: number) => ({
    mutationKey: ['updateCourse', courseId],
    mutationFn: async (
      data: Parameters<typeof updateCourse>[1]
    ): Promise<{course: TCourseBase; failedIds: string[]}> => {
      const course = await updateCourse(courseId, data);
      const students = data.students ?? [];

      if (students.length === 0) return {course, failedIds: []};

      try {
        const enrollments = await getEnrollments(courseId, {
          page: 0,
          pageSize: 1000,
        });
        const enrolledStudentIds = new Set(
          enrollments.response.students.map((student) => String(student.studentId))
        );

        const missingStudents = students.filter(
          ({studentId}) => !enrolledStudentIds.has(String(studentId))
        );

        const results = await Promise.allSettled(
          missingStudents.map(({studentId}) =>
            addEnrollment(courseId, String(studentId))
          )
        );

        const failedIds = results
          .map((result, index) =>
            result.status === 'rejected'
              ? String(missingStudents[index].studentId)
              : null
          )
          .filter((id): id is string => id !== null);

        return {course, failedIds};
      } catch {
        // 등록 확인 실패 시에도 강의 수정 성공은 유지
        return {course, failedIds: students.map(({studentId}) => String(studentId))};
      }
    },
  }),

  // 강의 삭제
  deleteCourse: {
    mutationKey: ['deleteCourse'],
    mutationFn: (courseId: number) => deleteCourse(courseId),
  },
};
