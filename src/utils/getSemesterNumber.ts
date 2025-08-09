export const getSemesterNumber = (semester: string): string => {
  switch (semester) {
    case 'FIRST':
      return '1';
    case 'SUMMER':
      return '여름';
    case 'SECOND':
      return '2';
    case 'WINTER':
      return '겨울';
    default:
      return 'unknown';
  }
};
