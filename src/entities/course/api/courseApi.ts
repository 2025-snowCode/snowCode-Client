import type {DashboardCourseListResponse} from '@/models/course';
import {privateAxios} from '@/shared/api/axiosInstance';

export const getAllCourses = async (): Promise<DashboardCourseListResponse> => {
  const response = await privateAxios.get('/courses/my');
  return response.data;
};

export const deleteCourse = async (courseId: number) => {
  const response = await privateAxios.delete(`/courses/${courseId}`);
  return response.data;
};
