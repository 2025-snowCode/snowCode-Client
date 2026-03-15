import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createCourse, courseQueries} from '@/entities/course';
import {handleApiError} from '@/shared/lib/handleApiError';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '@/shared/config/routes';
import {
  SEMESTER_CODE_MAP,
  type CourseFormValues,
} from './courseFormSchema';

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {mutate, isPending} = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: courseQueries.getAllCourses().queryKey,
      });
      navigate(ROUTES.ADMIN.ROOT);
    },
    onError: (error) => {
      handleApiError(error, '강의 개설에 실패했습니다. 다시 시도해주세요.');
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
