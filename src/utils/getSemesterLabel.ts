import type {SemesterCode} from '@/components/admin/assignments/dummy/types';

const SEMESTER_LABEL: Record<SemesterCode, '1' | '2' | '여름' | '겨울'> = {
  FIRST: '1',
  SECOND: '2',
  SUMMER: '여름',
  WINTER: '겨울',
};

export const getSemesterLabel = (semester: SemesterCode) => {
  return SEMESTER_LABEL[semester];
};
