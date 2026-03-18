import {z} from 'zod';
import {privateAxios} from '@/shared/api/axiosInstance';
import {apiResponseSchema} from '@/shared/model/schemas';
import {type TUnitFormSchema} from '@/entities/unit/model/schemas';
import {unitSchema} from '@/entities/unit/model/schemas';
import {ENDPOINTS} from '@/shared/config/endpoints';

// 강의별 전체 단원 조회
export const getAllUnitsByCourseId = async (courseId: number) => {
  const response = await privateAxios.get(ENDPOINTS.UNITS.BY_COURSE(courseId));
  const parsed = apiResponseSchema(
    z.object({
      count: z.number(),
      units: z.array(
        unitSchema.pick({id: true, title: true, assignmentCount: true})
      ),
    })
  ).parse(response.data);
  return parsed.response;
};

// 단일 단원 조회
export const getUnitById = async (unitId: number) => {
  const response = await privateAxios.get(ENDPOINTS.UNITS.DETAIL(unitId));
  const parsed = apiResponseSchema(unitSchema).parse(response.data);
  return parsed.response;
};

// 단원 삭제
export const deleteUnit = async (unitId: number) => {
  const response = await privateAxios.delete(ENDPOINTS.UNITS.DETAIL(unitId));
  const parsed = apiResponseSchema(z.string()).parse(response.data);
  return parsed.response;
};

// 단원 생성
export const createUnit = async (courseId: number, unit: TUnitFormSchema) => {
  const response = await privateAxios.post(ENDPOINTS.UNITS.CREATE(courseId), unit);
  const parsed = apiResponseSchema(unitSchema).parse(response.data);
  return parsed.response;
};

// 단원 수정
export const updateUnit = async (unitId: number, unit: TUnitFormSchema) => {
  const response = await privateAxios.put(ENDPOINTS.UNITS.DETAIL(unitId), unit);
  const parsed = apiResponseSchema(unitSchema).parse(response.data);
  return parsed.response;
};

// 단원에 등록된 과제 삭제
export const deleteAssignmentFromUnit = async (
  unitId: number,
  assignmentId: number
) => {
  const response = await privateAxios.delete(
    ENDPOINTS.UNITS.ASSIGNMENT_DETAIL(unitId, assignmentId)
  );
  const parsed = apiResponseSchema(z.string()).parse(response.data);
  return parsed.response;
};
