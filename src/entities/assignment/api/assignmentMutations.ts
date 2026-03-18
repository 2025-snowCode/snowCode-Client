import type {TAssignmentForm} from '@/entities/assignment/model/schemas';
import {createAssignment,updateAssignment,deleteAssignment} from '@/entities/assignment/api/assignmentApi';

interface UpdateAssignmentVariables {
  assignmentId: number;
  form: TAssignmentForm;
}

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
    }: UpdateAssignmentVariables) => 
      updateAssignment(assignmentId, form),
    },
};
