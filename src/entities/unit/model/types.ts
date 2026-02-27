import {z} from 'zod';
import {assignmentSchema} from '@/entities/assignment/model/schemas';

// 단원 도메인 스키마
export const unitSchema = z.object({
  id: z.number(),
  title: z.string(),
  releaseDate: z.string(),
  dueDate: z.string(),
  isOpen: z.boolean().optional(),
  assignmentCount: z.number(),
  assignments: z.array(assignmentSchema),
});

export type Unit = z.infer<typeof unitSchema>;

// 단원 생성/수정 폼 스키마
export const unitFormSchema = z
  .object({
    title: z.string().min(1, '단원 제목을 입력해주세요.'),
    releaseDate: z.string().min(1, '공개일을 입력해주세요.'),
    dueDate: z.string().min(1, '마감일을 입력해주세요.'),
    assignmentIds: z.array(z.number()).optional(),
  })
  .refine((data) => data.releaseDate <= data.dueDate, {
    message: '날짜 범위가 올바르지 않습니다.',
    path: ['dueDate'],
  });

// 단원 생성/수정 폼 타입
export type TUnitFormSchema = z.infer<typeof unitFormSchema>;
