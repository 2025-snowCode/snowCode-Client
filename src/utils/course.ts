import type {SemesterCode} from '@/models/Course';

const SEMESTER_MAP: Record<SemesterCode, '1' | '2' | '여름' | '겨울'> = {
  FIRST: '1',
  SECOND: '2',
  SUMMER: '여름',
  WINTER: '겨울',
} as const;

export const formatSemester = (semester: SemesterCode) => {
  const label = SEMESTER_MAP[semester];
  return `${label}학기`;
};
