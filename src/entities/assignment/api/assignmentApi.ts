import {z} from 'zod';
import {privateAxios} from '@/shared/api/axiosInstance';
import {apiResponseSchema} from '@/shared/model/schemas';
import {
  assignmentDetailsSchema,
  assignmentScheduleSchema,
  assignmentSubmissionResultSchema,
} from '../model/schemas';
import {assignmentCourseSchema} from '@/entities/course/model/schemas';

// 과제 일정 조회 API
export const getAssignmentSchedules = async () => {
  const response = await privateAxios.get('/assignments/schedule');
  return apiResponseSchema(
    z.object({count: z.number(), schedule: z.array(assignmentScheduleSchema)})
  ).parse(response.data);
};

// 전체 과제 목록 조회 API
export const getAllAssignments = async () => {
  const response = await privateAxios.get('/assignments/my');
  return apiResponseSchema(
    z.object({
      count: z.number(),
      assignments: z.array(
        z
          .object({assignmentId: z.number(), title: z.string()})
          .transform(({assignmentId, title}) => ({id: assignmentId, title}))
      ),
    })
  ).parse(response.data);
};

// 강의별 과제 목록 조회 API
export const getAssignmentsByCourse = async (courseId: number) => {
  const response = await privateAxios.get(`/courses/${courseId}/assignments`);
  return apiResponseSchema(
    z.object({
      count: z.number(),
      courses: z.array(assignmentCourseSchema),
    })
  ).parse(response.data);
};

// 단일 과제 상세 조회 API
export const getAssignmentDetails = async (assignmentId: number) => {
  const response = await privateAxios.get(`/assignments/${assignmentId}`);
  return apiResponseSchema(assignmentDetailsSchema).parse(response.data);
};

// 과제 삭제 API
export const deleteAssignment = async (assignmentId: number) => {
  const response = await privateAxios.delete(`/assignments/${assignmentId}`);
  return apiResponseSchema(z.string()).parse(response.data);
};

// 과제 코드 조회 API
export const getAssignmentCode = async (codeId: number) => {
  const response = await privateAxios.get(`/code/${codeId}`);
  const parsed = apiResponseSchema(
    z.object({
      id: z.number(),
      code: z.number(),
      language: z.string(),
    })
  ).parse(response.data);

  return parsed.response;
};

// 과제 제출 API
export const submitAssignment = async (
  unitId: number,
  assignmentId: number,
  code: string
) => {
  const response = await privateAxios.post(
    `/assignments/${unitId}/${assignmentId}/code`,
    {
      code: code,
      language: 'PYTHON',
    }
  );
  const parsed = apiResponseSchema(assignmentSubmissionResultSchema).parse(
    response.data
  );

  return parsed.response;
};
