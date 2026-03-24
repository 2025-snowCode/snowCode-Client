import {queryOptions} from '@tanstack/react-query';
import {getEnrollments, getEnrollmentById} from './studentApi';
import {
  mockEnrollmentList,
  mockStudentDetail,
} from '@/entities/student/model/mock';

const USE_MOCK = false;

export const studentQueries = {
  getEnrollments: (
    courseId: number,
    params: {page: number; pageSize: number; studentId?: string}
  ) =>
    queryOptions({
      queryKey: ['enrollments', courseId, params],
      queryFn: () =>
        USE_MOCK
          ? Promise.resolve(mockEnrollmentList)
          : getEnrollments(courseId, params).then((data) => data.response),
    }),

  getEnrollmentById: (courseId: number, memberId: number) =>
    queryOptions({
      queryKey: ['enrollment', courseId, memberId],
      queryFn: () =>
        USE_MOCK
          ? Promise.resolve(mockStudentDetail)
          : getEnrollmentById(courseId, memberId).then((data) => data.response),
    }),
};
