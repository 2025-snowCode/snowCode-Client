import type {TAssignmentForm} from '../model/schemas';
import {
  createAssignment,
  deleteAssignment,
  updateAssignment,
} from './assignmentApi';

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
