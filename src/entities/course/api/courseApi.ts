import type {ApiResponse} from '@/shared/model/common';
import type {
  DashboardCourseListResponse,
  CreateCourseRequest,
  CreateCourseResponse,
} from '@/entities/course/model/types';
import {privateAxios} from '@/shared/api/axiosInstance';

export const getAllCourses = async (): Promise<DashboardCourseListResponse> => {
  const response = await privateAxios.get('/courses/my');
  return response.data;
};

export const deleteCourse = async (
  courseId: number
): Promise<ApiResponse<string>> => {
  const response = await privateAxios.delete(`/courses/${courseId}`);
  return response.data;
};

export const createCourse = async (
  data: CreateCourseRequest
): Promise<CreateCourseResponse> => {
  const response = await privateAxios.post('/courses', data);
  return response.data;
};
