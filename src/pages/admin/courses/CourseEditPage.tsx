import {useNavigate, useParams} from 'react-router-dom';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {ROUTES} from '@/shared/config/routes';
import AssignmentFormLayout from '@/widgets/assignment-form-layout/ui/AssignmentFormLayout';
import {CourseForm} from '@/widgets/course-form/ui/CourseForm';
import {useEditCourse} from '@/features/course/edit-course/model/useEditCourse';
import {SEMESTER_DISPLAY_MAP} from '@/features/course/create-course/model/courseFormSchema';
import type {CourseFormValues} from '@/features/course/create-course/model/courseFormSchema';
import {courseQueries} from '@/entities/course/api/courseQueries';
import type {TDashboardCourse} from '@/entities/course/model/schemas';

export const CourseEditPage = () => {
  const {id} = useParams<{id: string}>();
  const courseId = Number(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {data} = useQuery({
    ...courseQueries.getCourseDetails(courseId),
    placeholderData: () => {
      const listData = queryClient.getQueryData<{
        courseCount: number;
        courses: TDashboardCourse[];
      }>(courseQueries.getAllCourses().queryKey);
      const course = listData?.courses.find((c) => c.id === courseId);
      if (!course) return undefined;
      return {
        success: true,
        response: {
          id: course.id,
          title: course.title,
          section: course.section,
          year: course.year,
          semester: course.semester,
          unitCount: course.unitCount,
          units: [],
        },
      };
    },
  });
  const {submit, isPending} = useEditCourse(courseId);

  if (!data) return null;

  const defaultValues: Partial<CourseFormValues> = {
    title: data.title,
    section: data.section,
    year: String(data.year) as CourseFormValues['year'],
    semester: SEMESTER_DISPLAY_MAP[data.semester],
  };

  return (
    <AssignmentFormLayout
      title='강의 수정'
      content={<CourseForm key={courseId} defaultValues={defaultValues} onSubmit={submit} />}
      onCancel={() => navigate(ROUTES.ADMIN.ROOT)}
      onConfirm={() => {
        document
          .getElementById('course-form')
          ?.dispatchEvent(new Event('submit', {cancelable: true, bubbles: true}));
      }}
      confirmDisabled={isPending}
    />
  );
};
