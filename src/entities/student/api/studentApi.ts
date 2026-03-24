import {z} from 'zod';
import {privateAxios} from '@/shared/api/axiosInstance';
import {apiResponseSchema} from '@/shared/model/schemas';
import {ENDPOINTS} from '@/shared/config/endpoints';
import {
  enrollmentListSchema,
  studentDetailSchema,
} from '@/entities/student/model/schemas';

export const getEnrollments = async (
  courseId: number,
  params: {page: number; pageSize: number; studentId?: string}
) => {
  const res = await privateAxios.get(ENDPOINTS.ENROLLMENTS.BY_COURSE(courseId), {params});
  return apiResponseSchema(enrollmentListSchema).parse(res.data);
};

export const getEnrollmentById = async (courseId: number, memberId: number) => {
  const res = await privateAxios.get(ENDPOINTS.ENROLLMENTS.DETAIL(courseId, memberId));
  return apiResponseSchema(studentDetailSchema).parse(res.data);
};

export const addEnrollment = async (courseId: number, studentId: string) => {
  const res = await privateAxios.post(ENDPOINTS.ENROLLMENTS.BY_COURSE(courseId), {studentId});
  return apiResponseSchema(z.string()).parse(res.data);
};
