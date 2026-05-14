import {
  addEnrollment,
  addEnrollmentsBulk,
  deleteEnrollment,
} from './studentApi';

export const studentMutations = {
  addEnrollment: (courseId: number) => ({
    mutationKey: ['addEnrollment', courseId],
    mutationFn: (studentId: string) => addEnrollment(courseId, studentId),
  }),

  addEnrollmentsBulk: (courseId: number) => ({
    mutationKey: ['addEnrollmentsBulk', courseId],
    mutationFn: (file: File) => addEnrollmentsBulk(courseId, file),
  }),
  deleteEnrollmentsBulk: (courseId: number) => ({
    mutationKey: ['deleteEnrollmentsBulk', courseId],
    mutationFn: (memberIds: number[]) =>
      Promise.all(memberIds.map((id) => deleteEnrollment(courseId, id))),
  }),
};
