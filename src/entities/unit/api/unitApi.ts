import type {AllUnitsResponse} from '@/models/course';
import {privateAxios} from '@/shared/api/axiosInstance';

// 강의별 전체 단원 조회
export const getAllUnitsByCourseId = async (
  courseId: number
): Promise<AllUnitsResponse> => {
  const response = await privateAxios.get(`/courses/${courseId}/units`);
  return response.data;
};
