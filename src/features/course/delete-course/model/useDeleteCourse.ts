import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteCourse} from '@/entities/course/api/courseApi';
import {courseQueries} from '@/entities/course/api/courseQueries';
import {assignmentQueries} from '@/entities/assignment/api/assignmentQueries';
import {handleApiError} from '@/shared/lib/handleApiError';

export const useDeleteCourse = (courseId: number, onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const {mutate, isPending} = useMutation({
    mutationFn: () => deleteCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: courseQueries.getAllCourses().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: assignmentQueries.getAssignmentSchedules().queryKey,
      });
      onSuccess?.();
    },
    onError: (error) => {
      handleApiError(error, '강의 삭제에 실패했습니다. 다시 시도해주세요.');
    },
  });

  return {handleDelete: mutate, isPending};
};
