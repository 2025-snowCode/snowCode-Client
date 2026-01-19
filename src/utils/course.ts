import type {SemesterCode, Unit} from '@/models/course';

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

export const formatDate = (date: string) => {
  return date.replaceAll('-', '.');
};

// MM.DD 형식으로 변환
export const formatDateMonthDay = (date: string) => {
  const [, month, day] = date.split('-');

  return `${month}.${day}`;
};

// 년/학기/분반 형식으로 변환
export const formateCourseTermWithSlash = (
  year: number,
  semester: SemesterCode,
  section: string
): string => {
  return `${year}\/${formatSemester(semester)}\/${section}분반`;
};

export const getTotalAssignmentCount = (units: Unit[]): number => {
  return units.reduce((acc, unit) => acc + unit.assignmentCount, 0);
};
