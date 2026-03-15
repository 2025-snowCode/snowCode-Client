import {deleteAssignment, submitAssignment} from './assignmentApi';

export const assignmentMutations = {
  deleteAssignment: {
    mutationKey: ['deleteAssignment'],
    mutationFn: (assignmentId: number) => deleteAssignment(assignmentId),
  },

  submitAssignment: {
    mutationKey: ['submitAssignment'],
    mutationFn: ({
      unitId,
      assignmentId,
      code,
    }: {
      unitId: number;
      assignmentId: number;
      code: string;
    }) => submitAssignment(unitId, assignmentId, code),
  },
};
