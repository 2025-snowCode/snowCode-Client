import {z} from 'zod';
import {privateAxios} from '@/shared/api/axiosInstance';
import {apiResponseSchema} from '@/shared/model/schemas';
import {assignmentScheduleSchema} from '../model/schemas';
import {assignmentSelectCourseSchema} from '@/entities/course/model/schemas';

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
      courses: z.array(assignmentSelectCourseSchema),
    })
  ).parse(response.data);
};

// 과제 삭제 API
export const deleteAssignment = async (assignmentId: number) => {
  const response = await privateAxios.delete(`/assignments/${assignmentId}`);
  return apiResponseSchema(z.string()).parse(response.data);
};
