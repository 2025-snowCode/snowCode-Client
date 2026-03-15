import {assignmentMutations} from '@/entities/assignment/api/assignmentMutations';
import type {TAssignmentSubmissionResult} from '@/entities/assignment/model/schemas';
import type {TCourseOverview} from '@/entities/course/model/schemas';
import {useMutation} from '@tanstack/react-query';
import {useState} from 'react';

export const useAssignmentSubmit = (
  courseDetails: TCourseOverview,
  assignmentId: number
) => {
  const [result, setResult] = useState<TAssignmentSubmissionResult | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const unitId = courseDetails.units.find((unit) =>
    unit.assignments.some((assignment) => assignment.id === assignmentId)
  )?.id;

  // 과제 제출 API 호출
  const {mutate: submit, isPending: isSubmitPending} = useMutation({
    ...assignmentMutations.submitAssignment,
    onSuccess: (data) => {
      setIsModalOpen(true);
      setResult({condeId: data.condeId, score: data.score});
    },
    onError: (error) => {
      console.error('과제 제출 실패:', error);
    },
  });

  // 제출 함수
  const onSubmit = (code: string) => {
    console.log('Submitting assignment with code:', code);
    submit({
      unitId: unitId ?? 0,
      assignmentId: Number(assignmentId),
      code,
    });
  };

  return {
    onSubmit,
    isSubmitPending,
    result,
    isModalOpen,
    setIsModalOpen,
    closeModal: () => setIsModalOpen(false),
  };
};
