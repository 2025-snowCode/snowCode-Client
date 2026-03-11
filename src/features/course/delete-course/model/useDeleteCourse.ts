import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteCourse, courseQueries} from '@/entities/course';
import {handleApiError} from '@/shared/lib/handleApiError';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '@/shared/config/routes';

export const useDeleteCourse = (courseId: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {mutate, isPending} = useMutation({
    mutationFn: () => deleteCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: courseQueries.getAllCourses().queryKey,
      });
      navigate(ROUTES.ADMIN.ROOT);
    },
    onError: (error) => {
      handleApiError(error, '강의 삭제에 실패했습니다. 다시 시도해주세요.');
    },
  });

  return {deleteCourse: mutate, isPending};
};
