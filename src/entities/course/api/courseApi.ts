import {z} from 'zod';
import {privateAxios} from '@/shared/api/axiosInstance';
import {apiResponseSchema} from '@/shared/model/schemas';
import {dashboardCourseSchema} from '../model/schemas';

// 전체 강의 목록 조회 API
export const getAllCourses = async () => {
  const response = await privateAxios.get('/courses/my');
  return apiResponseSchema(
    z.object({count: z.number(), courses: z.array(dashboardCourseSchema)})
  ).parse(response.data);
};

// 강의 삭제 API
export const deleteCourse = async (courseId: number) => {
  const response = await privateAxios.delete(`/courses/${courseId}`);
  return apiResponseSchema(z.string()).parse(response.data);
};
