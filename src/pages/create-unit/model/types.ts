import type {Unit} from '@/models/course';
import z from 'zod';

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

// 단원 편집 모드 타입
export type Mode = 'idle' | 'creating' | 'editing';

export interface UnitFormEditorProps {
  unit?: Unit;
  unitIndex: number;
  mode: Mode;
  onCreateUnit: (unit: TUnitFormSchema) => void;
  onUpdateUnit: (unitId: number, unit: TUnitFormSchema) => void;
  onDeleteUnit: (unitId: number) => void;
}
