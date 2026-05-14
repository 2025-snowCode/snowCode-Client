import {useMutation, useQueryClient} from '@tanstack/react-query';
import {courseQueries} from '@/entities/course/api/courseQueries';
import {courseMutations} from '@/entities/course/api/courseMutations';
import {handleApiError} from '@/shared/lib/handleApiError';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '@/shared/config/routes';
import {type CourseFormValues} from '@/features/course/create-course/model/schemas';
import {parseSemester} from '@/shared/lib/course';
import {useToastStore} from '@/shared/model/useToastStore';

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {showToast} = useToastStore();

  const {mutate, isPending} = useMutation({
    ...courseMutations.createCourse,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: courseQueries.getAllCourses().queryKey,
      });

      if (data.failedIds.length > 0) {
        alert(
          `강의는 생성되었으나, 다음 학생들은 가입되지 않았거나 학번이 올바르지 않아 등록에 실패했습니다:\n${data.failedIds.join(
            ', '
          )}`
        );
      } else {
        showToast('강의가 개설되었습니다.');
      }

      navigate(ROUTES.ADMIN.ROOT);
    },
    onError: (error: unknown) => {
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
      students: data.students?.map((id) => ({studentId: id})) ?? [],
    });
  };

  return {submit, isPending};
};
