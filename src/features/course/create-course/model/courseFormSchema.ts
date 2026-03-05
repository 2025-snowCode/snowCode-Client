import {z} from 'zod';

export const YEAR_OPTIONS = ['2021', '2022', '2023', '2024', '2025', '2026'] as const;
export const SEMESTER_OPTIONS = ['1학기', '2학기', '여름학기', '겨울학기'] as const;

export const SEMESTER_CODE_MAP = {
  '1학기': 'FIRST',
  '2학기': 'SECOND',
  여름학기: 'SUMMER',
  겨울학기: 'WINTER',
} as const;

/** 강의 생성 폼 유효성 검사 스키마 */
export const courseFormSchema = z.object({
  title: z.string().min(1, '강의 명을 입력해주세요.'),
  section: z.string().min(1, '분반을 입력해주세요.'),
  year: z.enum(YEAR_OPTIONS, {
    errorMap: () => ({message: '연도를 선택해주세요.'}),
  }),
  semester: z.enum(SEMESTER_OPTIONS, {
    errorMap: () => ({message: '학기를 선택해주세요.'}),
  }),
  description: z.string().optional(),
});

export type CourseFormValues = z.infer<typeof courseFormSchema>;
