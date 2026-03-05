import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createCourse, courseQueryOptions} from '@/entities/course';
import {handleApiError} from '@/shared/lib/handleApiError';
import {useNavigate} from 'react-router-dom';

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: courseQueryOptions().queryKey,
      });
      navigate('/admin');
    },
    onError: (error) => {
      handleApiError(error, '강의 개설에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
