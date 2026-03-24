import {addEnrollment} from './studentApi';

export const studentMutations = {
  addEnrollment: (courseId: number) => ({
    mutationKey: ['addEnrollment', courseId],
    mutationFn: (studentId: string) => addEnrollment(courseId, studentId),
  }),
};
