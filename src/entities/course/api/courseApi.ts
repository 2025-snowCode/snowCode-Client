import {
  createCourseResponseSchema,
  type CreateCourseRequest,
  type CreateCourseResponse,
} from '@/entities/course/model/courseSchema';
import {z} from 'zod';
import {privateAxios} from '@/shared/api/axiosInstance';
import {apiResponseSchema} from '@/shared/model/schemas';
import {courseOverviewSchema, dashboardCourseSchema} from '../model/schemas';
import {ENDPOINTS} from '@/shared/config/endpoints';

// 전체 강의 목록 조회 API
export const getAllCourses = async () => {
  const response = await privateAxios.get(ENDPOINTS.COURSES.MY);
  return apiResponseSchema(
    z.object({count: z.number(), courses: z.array(dashboardCourseSchema)})
  ).parse(response.data);
};

// 단일 강의 조회 API
export const getCourseById = async (courseId: number) => {
  const response = await privateAxios.get(ENDPOINTS.COURSES.DETAIL(courseId));
  return apiResponseSchema(courseOverviewSchema).parse(response.data);
};

// 강의 삭제 API
export const deleteCourse = async (courseId: number) => {
  const response = await privateAxios.delete(ENDPOINTS.COURSES.DETAIL(courseId));
  return apiResponseSchema(z.string()).parse(response.data);
};

export const createCourse = async (
  data: CreateCourseRequest
): Promise<CreateCourseResponse> => {
  const response = await privateAxios.post(ENDPOINTS.COURSES.ROOT, data);
  return createCourseResponseSchema.parse(response.data);
};

export const updateCourse = async (
  courseId: number,
  data: CreateCourseRequest
): Promise<CreateCourseResponse> => {
  const response = await privateAxios.put(ENDPOINTS.COURSES.DETAIL(courseId), data);
  return createCourseResponseSchema.parse(response.data);
};
