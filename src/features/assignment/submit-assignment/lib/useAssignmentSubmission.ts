import {assignmentMutations} from '@/entities/assignment/api/assignmentMutations';
import type {TAssignmentSubmissionResult} from '@/entities/assignment/model/schemas';
import {courseQueries} from '@/entities/course/api/courseQueries';
import type {TCourseOverview} from '@/entities/course/model/schemas';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';

export const useAssignmentSubmission = (
  courseDetails: TCourseOverview,
  assignmentId: number
) => {
  const [result, setResult] = useState<TAssignmentSubmissionResult | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // unitId 찾기
  const unitId = courseDetails.units.find((unit) =>
    unit.assignments.some((assignment) => assignment.id === assignmentId)
  )?.id;

  const queryClient = useQueryClient();

  // 과제 제출 API 호출
  const {mutate: submit, isPending: isSubmitPending} = useMutation({
    ...assignmentMutations.submitAssignment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: courseQueries.getCourseDetails(courseDetails.id).queryKey,
      });
      setIsModalOpen(true);
      setResult(data);
    },
    onError: (error) => {
      console.error('과제 제출 실패:', error);
    },
  });

  // 제출 함수
  const onSubmit = (code: string) => {
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
