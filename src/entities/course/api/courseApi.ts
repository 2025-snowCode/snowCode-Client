import {
  courseBaseSchema,
  courseOverviewSchema,
  dashboardCourseSchema,
} from '@/entities/course/model/schemas';
import type {
  TCreateCourseRequest,
  TCourseBase,
  TCourseOverview,
  TDashboardCourse,
} from '@/entities/course/model/schemas';
import {z} from 'zod';
import {privateAxios} from '@/shared/api/axiosInstance';
import {apiResponseSchema} from '@/shared/model/schemas';
import {ENDPOINTS} from '@/shared/config/endpoints';

// 전체 강의 목록 조회 API
export const getAllCourses = async (): Promise<{
  count: number;
  courses: TDashboardCourse[];
}> => {
  const response = await privateAxios.get(ENDPOINTS.COURSES.MY);
  const parsed = apiResponseSchema(
    z.object({count: z.number(), courses: z.array(dashboardCourseSchema)})
  ).parse(response.data);
  return parsed.response;
};

// 단일 강의 조회 API
export const getCourseById = async (
  courseId: number
): Promise<TCourseOverview> => {
  const response = await privateAxios.get(ENDPOINTS.COURSES.DETAIL(courseId));
  const parsed = apiResponseSchema(courseOverviewSchema).parse(response.data);
  return parsed.response;
};

// 강의 삭제 API
export const deleteCourse = async (courseId: number): Promise<string> => {
  const response = await privateAxios.delete(
    ENDPOINTS.COURSES.DETAIL(courseId)
  );
  const parsed = apiResponseSchema(z.string()).parse(response.data);
  return parsed.response;
};

export const createCourse = async (
  data: TCreateCourseRequest
): Promise<TCourseBase> => {
  const response = await privateAxios.post(ENDPOINTS.COURSES.ROOT, data);
  const parsed = apiResponseSchema(courseBaseSchema).parse(response.data);
  return parsed.response;
};

export const updateCourse = async (
  courseId: number,
  data: TCreateCourseRequest
): Promise<TCourseBase> => {
  const response = await privateAxios.put(
    ENDPOINTS.COURSES.DETAIL(courseId),
    data
  );
  const parsed = apiResponseSchema(courseBaseSchema).parse(response.data);
  return parsed.response;
};
