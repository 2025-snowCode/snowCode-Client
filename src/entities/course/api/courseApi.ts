import type {ApiResponse} from '@/shared/model/common';
import type {DashboardCourseListResponse} from '@/entities/course/model/types';
import {privateAxios} from '@/shared/api/axiosInstance';

// 전체 강의 목록 조회 API
export const getAllCourses = async (): Promise<DashboardCourseListResponse> => {
  const response = await privateAxios.get('/courses/my');
  return response.data;
};

// 강의 삭제 API
export const deleteCourse = async (
  courseId: number
): Promise<ApiResponse<string>> => {
  const response = await privateAxios.delete(`/courses/${courseId}`);
  return response.data;
};
