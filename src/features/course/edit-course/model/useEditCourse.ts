import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updateCourse, courseQueries} from '@/entities/course';
import {handleApiError} from '@/shared/lib/handleApiError';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '@/shared/config/routes';
import {
  SEMESTER_CODE_MAP,
  type CourseFormValues,
} from '@/features/course/create-course/model/courseFormSchema';

export const useEditCourse = (courseId: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {mutate, isPending} = useMutation({
    mutationFn: (data: Parameters<typeof updateCourse>[1]) =>
      updateCourse(courseId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: courseQueries.getAllCourses().queryKey,
      });
      navigate(ROUTES.ADMIN.ROOT);
    },
    onError: (error) => {
      handleApiError(error, '강의 수정에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const submit = (data: CourseFormValues) => {
    mutate({
      title: data.title,
      section: data.section,
      year: Number(data.year),
      semester: SEMESTER_CODE_MAP[data.semester],
      description: data.description,
      students: [],
    });
  };

  return {submit, isPending};
};
