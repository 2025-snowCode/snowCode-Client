import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updateCourse} from '@/entities/course/api/courseApi';
import {courseQueries} from '@/entities/course/api/courseQueries';
import {handleApiError} from '@/shared/lib/handleApiError';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '@/shared/config/routes';
import {type CourseFormValues} from '@/features/course/create-course/model/schemas';
import {parseSemester} from '@/shared/lib/course';

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
      queryClient.invalidateQueries({
        queryKey: courseQueries.getCourseDetails(courseId).queryKey,
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
      semester: parseSemester(data.semester),
      description: data.description ?? '',
      students: [],
    });
  };

  return {submit, isPending};
};
