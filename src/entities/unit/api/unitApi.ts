import type {ApiResponse} from '@/models/common';
import type {AllUnitsResponse, Unit} from '@/models/course';
import {privateAxios} from '@/shared/api/axiosInstance';

// 강의별 전체 단원 조회
export const getAllUnitsByCourseId = async (
  courseId: number
): Promise<AllUnitsResponse> => {
  const response = await privateAxios.get(`/courses/${courseId}/units`);
  return response.data;
};

// 단일 단원 조회
export const getUnitById = async (unitId: number): Promise<Unit> => {
  const response = await privateAxios.get(`/units/${unitId}`);
  return response.data;
};

// 단원 삭제
export const deleteUnitById = async (
  unitId: number
): Promise<ApiResponse<string>> => {
  const response = await privateAxios.delete(`/units/${unitId}`);
  return response.data;
};
