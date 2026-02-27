import {z} from 'zod';
import {privateAxios} from '@/shared/api/axiosInstance';
import {apiResponseSchema} from '@/shared/model/schemas';
import {unitSchema, type TUnitFormSchema} from '../model/types';

// 강의별 전체 단원 조회
export const getAllUnitsByCourseId = async (courseId: number) => {
  const response = await privateAxios.get(`/courses/${courseId}/units`);
  return apiResponseSchema(
    z.object({
      count: z.number(),
      units: z.array(unitSchema.pick({id: true, title: true, assignmentCount: true})),
    })
  ).parse(response.data);
};

// 단일 단원 조회
export const getUnitById = async (unitId: number | null) => {
  const response = await privateAxios.get(`/units/${unitId}`);
  return apiResponseSchema(unitSchema).parse(response.data);
};

// 단원 삭제
export const deleteUnit = async (unitId: number) => {
  const response = await privateAxios.delete(`/units/${unitId}`);
  return apiResponseSchema(z.string()).parse(response.data);
};

// 단원 생성
export const createUnit = async (courseId: number, unit: TUnitFormSchema) => {
  const response = await privateAxios.post(`/units/${courseId}`, unit);
  return apiResponseSchema(unitSchema).parse(response.data);
};

// 단원 수정
export const updateUnit = async (unitId: number, unit: TUnitFormSchema) => {
  const response = await privateAxios.put(`/units/${unitId}`, unit);
  return apiResponseSchema(unitSchema).parse(response.data);
};

// 단원에 등록된 과제 삭제
export const deleteAssignmentFromUnit = async (
  unitId: number,
  assignmentId: number
) => {
  const response = await privateAxios.delete(
    `/units/${unitId}/assignments/${assignmentId}`
  );
  return apiResponseSchema(z.string()).parse(response.data);
};
