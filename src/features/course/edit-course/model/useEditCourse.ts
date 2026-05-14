import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updateCourse} from '@/entities/course/api/courseApi';
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

export const useEditCourse = (courseId: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {showToast} = useToastStore();

  const {mutate, isPending} = useMutation({
    mutationFn: async (
      data: Parameters<typeof updateCourse>[1]
    ): Promise<{course: any; failedIds: string[]}> => {
      const course = await updateCourse(courseId, data);
      const students = data.students ?? [];

      if (students.length === 0) return {course, failedIds: []};

      // 기존 수강생 목록 조회 (중복 등록 방지 및 가입 여부 확인용)
      const enrollments = await getEnrollments(courseId, {
        page: 0,
        pageSize: 1000,
      });
      const enrolledStudentIds = new Set(
        enrollments.response.students.map((student) => student.studentId)
      );

      // 아직 등록되지 않은 학생들만 시도
      const missingStudents = students.filter(
        ({studentId}) => !enrolledStudentIds.has(studentId)
      );

      const results = await Promise.allSettled(
        missingStudents.map(({studentId}) => addEnrollment(courseId, studentId))
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
      queryClient.invalidateQueries({
        queryKey: courseQueries.getCourseDetails(courseId).queryKey,
      });

      if (data.failedIds.length > 0) {
        alert(
          `강의 정보는 수정되었으나, 다음 학생들은 가입되지 않았거나 학번이 올바르지 않아 등록에 실패했습니다:\n${data.failedIds.join(
            ', '
          )}`
        );
      } else {
        showToast('강의가 수정되었습니다.');
      }

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
      students: data.students?.map((id) => ({studentId: id})) ?? [],
    });
  };

  return {submit, isPending};
};
