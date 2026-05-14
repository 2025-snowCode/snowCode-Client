import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createCourse} from '@/entities/course/api/courseApi';
import {
  addEnrollment,
  getEnrollments,
} from '@/entities/student/api/studentApi';
import {courseQueries} from '@/entities/course/api/courseQueries';
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
    mutationFn: async (
      payload: Parameters<typeof createCourse>[0]
    ): Promise<{course: any; failedIds: string[]}> => {
      const course = await createCourse(payload);
      const students = payload.students ?? [];

      if (students.length === 0) return {course, failedIds: []};

      // 백엔드가 일부 학생을 이미 등록했을 수 있으므로 확인 (중복 등록 에러 방지)
      const enrollments = await getEnrollments(course.id, {
        page: 0,
        pageSize: 1000,
      });
      const enrolledStudentIds = new Set(
        enrollments.response.students.map((s) => s.studentId)
      );

      // 아직 등록되지 않은 학생들만 개별 등록 시도
      const missingStudents = students.filter(
        ({studentId}) => !enrolledStudentIds.has(studentId)
      );

      const results = await Promise.allSettled(
        missingStudents.map(({studentId}) => addEnrollment(course.id, studentId))
      );

      const failedIds = results
        .map((result, index) =>
          result.status === 'rejected' ? missingStudents[index].studentId : null
        )
        .filter((id): id is string => id !== null);

      return {course, failedIds};
    },
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
    onError: (error: any) => {
      // PARTIAL_SUCCESS 상황이 아닌 실제 API 에러인 경우에만 처리
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
