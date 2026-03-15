import type {TAssignmentForm} from '@/entities/assignment/model/schemas';
import {createAssignment,updateAssignment,deleteAssignment} from '@/entities/assignment/api/assignmentApi';

export const assignmentMutations = {
  deleteAssignment: {
    mutationKey: ['deleteAssignment'],
    mutationFn: (assignmentId: number) => deleteAssignment(assignmentId),
  },

  createAssignment: {
    mutationKey: ['createAssignment'],
    mutationFn: (form: TAssignmentForm) => createAssignment(form),
  },

  updateAssignment: {
    mutationKey: ['updateAssignment'],
    mutationFn: ({
      assignmentId,
      form,
    }: {
      assignmentId: number;
      form: TAssignmentForm;
    }) => updateAssignment(assignmentId, form),
  },
};
