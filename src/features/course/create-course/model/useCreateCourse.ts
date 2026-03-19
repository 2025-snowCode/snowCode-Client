import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createCourse} from '@/entities/course/api/courseApi';
import {courseQueries} from '@/entities/course/api/courseQueries';
import {handleApiError} from '@/shared/lib/handleApiError';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '@/shared/config/routes';
import {type CourseFormValues} from '@/features/course/create-course/model/schemas';
import {parseSemester} from '@/shared/lib/course';

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
      semester: parseSemester(data.semester),
      description: data.description ?? '',
      students: [],
    });
  };

  return {submit, isPending};
};
