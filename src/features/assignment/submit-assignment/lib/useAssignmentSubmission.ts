import {assignmentMutations} from '@/entities/assignment/api/assignmentMutations';
import {assignmentQueries} from '@/entities/assignment/api/assignmentQueries';
import type {TAssignmentSubmissionResult} from '@/entities/assignment/model/schemas';
import {courseQueries} from '@/entities/course/api/courseQueries';
import type {TCourseOverview} from '@/entities/course/model/schemas';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';

export const useAssignmentSubmission = (
  unitId: number,
  courseDetails: TCourseOverview,
  assignmentId: number,
  onSubmitSuccess?: (codeId: number) => void
) => {
  const [result, setResult] = useState<TAssignmentSubmissionResult | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  // 과제 제출 API 호출
  const {mutate: submit, isPending: isSubmitPending} = useMutation({
    ...assignmentMutations.submitAssignment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: courseQueries.getCourseDetails(courseDetails.id).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: assignmentQueries.getAssignmentSubmissionHistory(unitId, assignmentId).queryKey,
      });
      onSubmitSuccess?.(data.codeId);
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
      unitId: unitId!,
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
