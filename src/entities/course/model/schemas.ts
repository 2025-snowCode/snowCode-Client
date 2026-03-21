import {assignmentSchema} from '@/entities/assignment/model/schemas';
import {unitSchema} from '@/entities/unit/model/schemas';
import {semesterCodeSchema} from '@/shared/model/schemas';
import {z} from 'zod';

/** 강의 공통 핵심 필드 */
export const courseCoreSchema = z.object({
  title: z.string().min(1, '강의 명을 입력해주세요.'),
  section: z.string().min(1, '분반을 입력해주세요.'),
  year: z.number().min(2001).max(2099),
  semester: semesterCodeSchema,
  description: z
    .string()
    .nullish()
    .transform((v) => v ?? ''),
});

/** 강의 기본 정보 (ID 포함) */
export const courseBaseSchema = courseCoreSchema.extend({
  id: z.number(),
  description: z
    .string()
    .nullish()
    .transform((v) => v ?? ''), // 응답에서는 기본값 처리
});

/** 강의 추가/수정 요청 스키마 */
export const createCourseRequestSchema = courseCoreSchema.extend({
  students: z.array(z.object({studentId: z.string()})).optional(),
});

/** 강의 상세 정보 스키마 */
export const courseOverviewSchema = courseBaseSchema.extend({
  year: z.number(),
  semester: semesterCodeSchema,
  section: z.string(),
  studentCount: z.number().optional(),
  unitCount: z.number(),
  units: z.array(unitSchema),
});

/** 대시보드 강의 카드용 스키마 */
export const dashboardCourseSchema = courseBaseSchema.extend({
  unitCount: z.number(),
  assignmentCount: z.number(),
});

/** 과제 선택 시 강의 목록용 스키마 */
export const assignmentCourseSchema = courseBaseSchema.extend({
  count: z.number(),
  assignments: z.array(assignmentSchema.pick({id: true, title: true})),
});
