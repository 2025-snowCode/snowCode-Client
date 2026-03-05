import type {
  AssignmentSelectResponse,
  DashboardScheduleListResponse,
} from '@/entities/course/model/types';
import {privateAxios} from '@/shared/api/axiosInstance';
import type {ApiResponse} from '@/shared/model';
import type {AssignmentsResponse} from '../model/types';

// 과제 일정 조회 API
export const getAssignmentSchedules =
  async (): Promise<DashboardScheduleListResponse> => {
    const response = await privateAxios.get('/assignments/schedule');
    return response.data;
  };

// 전체 과제 목록 조회 API
export const getAllAssignments = async (): Promise<
  ApiResponse<AssignmentsResponse>
> => {
  const response = await privateAxios.get<
    ApiResponse<{
      count: number;
      assignments: {assignmentId: number; title: string}[];
    }>
  >('/assignments/my');
  const raw = response.data;
  return {
    ...raw,
    response: {
      count: raw.response.count,
      assignments: raw.response.assignments.map(({assignmentId, title}) => ({
        id: assignmentId,
        title,
      })),
    },
  };
};

// 강의별 과제 목록 조회 API
export const getAssignmentsByCourse = async (
  courseId: number
): Promise<AssignmentSelectResponse> => {
  const response = await privateAxios.get(`/courses/${courseId}/assignments`);
  return response.data;
};

// 과제 삭제 API
export const deleteAssignment = async (
  assignmentId: number
): Promise<ApiResponse<string>> => {
  const response = await privateAxios.delete(`/assignments/${assignmentId}`);
  return response.data;
};
