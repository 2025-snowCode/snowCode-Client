import {deleteCourse} from './courseApi';

export const courseMutations = {
  // 강의 삭제 뮤테이션 옵션
  deleteCourse: {
    mutationKey: ['deleteCourse'],
    mutationFn: (courseId: number) => deleteCourse(courseId),
  },
};
