import {z} from 'zod';

export const SEMESTER_OPTIONS = ['1학기', '2학기', '여름학기', '겨울학기'] as const;
const currentYear = new Date().getFullYear();
export const YEAR_OPTIONS = Array.from({length:6}, (_,i)=>String(currentYear - 5 +i)) as unknown as readonly string[];

/** 강의 생성 폼 유효성 검사 스키마 */
export const courseFormSchema = z.object({
  title: z.string().min(1, '강의 명을 입력해주세요.'),
  section: z.string().min(1, '분반을 입력해주세요.'),
  year: z.enum([YEAR_OPTIONS[0], ...YEAR_OPTIONS.slice(1)], {
    errorMap: () => ({message: '연도를 선택해주세요.'}),
  }),
  semester: z.enum(SEMESTER_OPTIONS, {
    errorMap: () => ({message: '학기를 선택해주세요.'}),
  }),
  description: z.string().optional(),
  students: z.array(z.string()).optional(),
});

export type CourseFormValues = z.infer<typeof courseFormSchema>;
