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
    mutationFn: async (memberIds: number[]) => {
      const results = await Promise.allSettled(
        memberIds.map((id) => deleteEnrollment(courseId, id))
      );
      const failed = results
        .map((result, index) =>
          result.status === 'rejected' ? memberIds[index] : null
        )
        .filter((id): id is number => id !== null);
      return {total: memberIds.length, failed};
    },
  }),
};
