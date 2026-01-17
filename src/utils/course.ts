import type {SemesterCode, Unit} from '@/models/course';

const SEMESTER_MAP: Record<SemesterCode, '1' | '2' | '여름' | '겨울'> = {
  FIRST: '1',
  SECOND: '2',
  SUMMER: '여름',
  WINTER: '겨울',
} as const;

// 학기 포맷팅
export const formatSemester = (semester: SemesterCode) => {
  const label = SEMESTER_MAP[semester];
  return `${label}학기`;
};

// 날짜 포맷팅
export const formatDate = (date: string) => {
  return date.replaceAll('-', '.');
};

// 과제 기간 포맷팅
export const formatPeriod = (releaseDate: string, dueDate: string) => {
  return `${formatDate(releaseDate)} ~ ${formatDate(dueDate)}`;
};

// 강의 정보 포맷팅
export const formatCourseInfo = (
  year: number,
  semester: SemesterCode,
  section: string
) => {
  return `${year}년 ${formatSemester(semester)} ${section}분반`;
};

// 총 과제 수 계산
export const getTotalAssignmentCount = (units: Unit[]): number => {
  return units.reduce((acc, unit) => acc + unit.assignmentCount, 0);
};
