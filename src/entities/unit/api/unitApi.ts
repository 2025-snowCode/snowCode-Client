import type {ApiResponse} from '@/models/common';
import type {AllUnitsResponse, Unit} from '@/models/course';
import {privateAxios} from '@/shared/api/axiosInstance';
import type {TUnitFormSchema} from '../model/types';

// 강의별 전체 단원 조회
export const getAllUnitsByCourseId = async (
  courseId: number
): Promise<AllUnitsResponse> => {
  const response = await privateAxios.get(`/courses/${courseId}/units`);
  return response.data;
};

// 단일 단원 조회
export const getUnitById = async (
  unitId: number | null
): Promise<ApiResponse<Unit>> => {
  const response = await privateAxios.get(`/units/${unitId}`);
  return response.data;
};

// 단원 삭제
export const deleteUnit = async (
  unitId: number
): Promise<ApiResponse<string>> => {
  const response = await privateAxios.delete(`/units/${unitId}`);
  return response.data;
};

// 단원 생성
export const createUnit = async (
  courseId: number,
  unit: TUnitFormSchema
): Promise<ApiResponse<Unit>> => {
  const response = await privateAxios.post(`/units/${courseId}`, unit);
  return response.data;
};

// 단원 수정
export const updateUnit = async (
  unitId: number,
  unit: TUnitFormSchema
): Promise<ApiResponse<Unit>> => {
  const response = await privateAxios.put(`/units/${unitId}`, unit);
  return response.data;
};
