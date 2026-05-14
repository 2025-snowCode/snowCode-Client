import type {TAssignmentForm} from '@/entities/assignment/model/schemas';
import {
  createAssignment,
  updateAssignment,
  deleteAssignment,
  submitAssignment,
  uploadTestcasesBulk,
} from '@/entities/assignment/api/assignmentApi';

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
    mutationFn: ({assignmentId, form}: UpdateAssignmentVariables) =>
      updateAssignment(assignmentId, form),
  },

  uploadTestcasesBulk: {
    mutationKey: ['uploadTestcasesBulk'],
    mutationFn: ({
      assignmentId,
      file,
    }: {
      assignmentId: number;
      file: File;
    }) => uploadTestcasesBulk(assignmentId, file),
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
