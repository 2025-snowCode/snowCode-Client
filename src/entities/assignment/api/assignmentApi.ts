import {z} from 'zod';
import {privateAxios} from '@/shared/api/axiosInstance';
import {apiResponseSchema} from '@/shared/model/schemas';
import {
  assignmentDetailSchema,
  assignmentScheduleSchema,
  type TAssignmentForm,
} from '@/entities/assignment/model/schemas';
import {assignmentCourseSchema} from '@/entities/course/model/schemas';
import {ENDPOINTS} from '@/shared/config/endpoints';

// 과제 일정 조회 API
export const getAssignmentSchedules = async () => {
  const response = await privateAxios.get(ENDPOINTS.ASSIGNMENTS.SCHEDULE);
  const parsed = apiResponseSchema(
    z.object({count: z.number(), schedule: z.array(assignmentScheduleSchema)})
  ).parse(response.data);
  return parsed.response;
};

// 전체 과제 목록 조회 API
export const getAllAssignments = async () => {
  const response = await privateAxios.get(ENDPOINTS.ASSIGNMENTS.MY);
  const parsed = apiResponseSchema(
    z.object({
      count: z.number(),
      assignments: z.array(
        z
          .object({assignmentId: z.number(), title: z.string()})
          .transform(({assignmentId, title}) => ({id: assignmentId, title}))
      ),
    })
  ).parse(response.data);
  return parsed.response;
};

// 강의별 과제 목록 조회 API
export const getAssignmentsByCourse = async (courseId: number) => {
  const response = await privateAxios.get(ENDPOINTS.ASSIGNMENTS.BY_COURSE(courseId));
  const parsed = apiResponseSchema(
    z.object({
      count: z.number(),
      courses: z.array(assignmentCourseSchema),
    })
  ).parse(response.data);
  return parsed.response;
};

// 과제 삭제 API
export const deleteAssignment = async (assignmentId: number) => {
  const response = await privateAxios.delete(ENDPOINTS.ASSIGNMENTS.DETAIL(assignmentId));
  const parsed = apiResponseSchema(z.string()).parse(response.data);
  return parsed.response;
};

// 과제 조회 API
export const getAssignment = async (assignmentId: number) => {
  const response = await privateAxios.get(ENDPOINTS.ASSIGNMENTS.DETAIL(assignmentId));
  const parsed = apiResponseSchema(assignmentDetailSchema).parse(response.data);
  return parsed.response;
};

// 과제 추가 API
export const createAssignment = async (form: TAssignmentForm) => {
  const response = await privateAxios.post(ENDPOINTS.ASSIGNMENTS.ROOT, form);
  const parsed = apiResponseSchema(assignmentDetailSchema).parse(response.data);
  return parsed.response;
};

// 과제 수정 API
export const updateAssignment = async (
  assignmentId: number,
  form: TAssignmentForm
) => {
  const response = await privateAxios.put(ENDPOINTS.ASSIGNMENTS.DETAIL(assignmentId), form);
  const parsed = apiResponseSchema(assignmentDetailSchema).parse(response.data);
  return parsed.response;
};
