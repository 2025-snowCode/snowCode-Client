import {z} from 'zod';

export const semesterCodeSchema = z.enum(['FIRST', 'SECOND', 'SUMMER', 'WINTER']);

/** 강의 추가 요청 스키마 */
export const createCourseRequestSchema = z.object({
  title: z.string().min(1, '강의 명을 입력해주세요.'),
  section: z.string().min(1, '분반을 입력해주세요.'),
  year: z.number().min(2001).max(2099),
  semester: semesterCodeSchema,
  description: z.string().optional(),
  students: z.array(z.object({studentId: z.string()})).optional(),
});

/** 강의 추가 응답 스키마 */
export const createCourseResponseSchema = z.object({
  success: z.boolean(),
  response: z.object({
    id: z.number(),
    title: z.string(),
    section: z.string(),
    year: z.number(),
    semester: semesterCodeSchema,
    description: z.string(),
  }),
});

export type CreateCourseRequest = z.infer<typeof createCourseRequestSchema>;
export type CreateCourseResponse = z.infer<typeof createCourseResponseSchema>;


