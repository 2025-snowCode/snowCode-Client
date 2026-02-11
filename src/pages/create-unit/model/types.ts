import z from 'zod';

// 단원 생성/수정 폼 스키마
export const unitFormSchema = z
  .object({
    title: z.string(),
    releaseDate: z.string(),
    dueDate: z.string(),
    assignmentIds: z.array(z.number()).optional(),
  })
  .refine((data) => data.releaseDate <= data.dueDate, {
    message: '날짜 범위가 올바르지 않습니다.',
    path: ['dueDate'],
  });

// 단원 생성/수정 폼 타입
export type TUnitFormSchema = z.infer<typeof unitFormSchema>;
