import {useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useForm} from 'react-hook-form';
import {assignmentMutations} from '@/entities/assignment/api/assignmentMutations';
import {assignmentQueries} from '@/entities/assignment/api/assignmentQueries';
import {handleApiError} from '@/shared/lib/handleApiError';
import type {TAssignmentForm} from '@/entities/assignment/model/schemas';
import {useToastStore} from '@/shared/model/useToastStore';

export const useAssignmentForm = (assignmentId?: number) => {
  const isEditMode = !!assignmentId;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {showToast} = useToastStore();
  const hasInitialized = useRef(false);

  const {register, handleSubmit, watch, setValue, reset} =
    useForm<TAssignmentForm>({
      defaultValues: {
        title: '',
        score: 0,
        description: '',
        testcases: [{testcase: '', answer: '', isPublic: true}],
      },
    });

  const {data} = useQuery({
    ...assignmentQueries.getAssignment(assignmentId!),
    enabled: isEditMode,
  });

  useEffect(() => {
    if (data && !hasInitialized.current) {
      hasInitialized.current = true;
      reset({
        title: data.title,
        score: data.score ?? 0,
        description: data.description,
        testcases: data.testcases.map(({testcase, answer, isPublic}) => ({
          testcase,
          answer,
          isPublic,
        })),
      });
    }
  }, [data, reset]);

  const {mutate: createAssignment, isPending: isCreating} = useMutation({
    ...assignmentMutations.createAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: assignmentQueries.getAllAssignments().queryKey,
      });
      showToast('문제가 등록되었습니다.');
      navigate(-1);
    },
    onError: (error) => handleApiError(error, '문제 등록에 실패했습니다.'),
  });

  const {mutate: updateAssignment, isPending: isUpdating} = useMutation({
    ...assignmentMutations.updateAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: assignmentQueries.getAllAssignments().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: assignmentQueries.getAssignment(assignmentId!).queryKey,
      });
      showToast('문제가 수정되었습니다.');
      navigate(-1);
    },
    onError: (error) => handleApiError(error, '문제 수정에 실패했습니다.'),
  });

  const onSubmit = (form: TAssignmentForm) => {
    if (isEditMode) {
      updateAssignment({assignmentId: assignmentId!, form});
    } else {
      createAssignment(form);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    watch,
    setValue,
    isEditMode,
    isPending: isCreating || isUpdating,
    navigate,
  };
};
