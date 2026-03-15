import {useNavigate, useParams} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import {ROUTES} from '@/shared/config/routes';
import AssignmentFormLayout from '@/widgets/assignment-form-layout/ui/AssignmentFormLayout';
import {CourseForm} from '@/widgets/course-form/ui/CourseForm';
import {useEditCourse} from '@/features/course/edit-course/model/useEditCourse';
import {SEMESTER_DISPLAY_MAP} from '@/features/course/create-course/model/courseFormSchema';
import {courseQueries} from '@/entities/course/api/courseQueries';
import type {CourseFormValues} from '@/features/course/create-course/model/courseFormSchema';
import {useRef} from 'react';

export const CourseEditPage = () => {
  const {id} = useParams<{id: string}>();
  const courseId = Number(id);
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const {data, isLoading, isError} = useQuery({
    ...courseQueries.getCourseDetails(courseId),
  });
  const {submit, isPending} = useEditCourse(courseId);

  if (!id || isNaN(courseId)) {
    navigate(ROUTES.ADMIN.ROOT);
    return null;
  }

  if (isLoading || !data) {
    return (
      <AssignmentFormLayout
        title='강의 수정'
        content={
          <div className='flex justify-center py-20 text-light-black'>
            데이터를 불러오는 중입니다...
          </div>
        }
        onCancel={() => navigate(ROUTES.ADMIN.ROOT)}
        onConfirm={() => {}}
        confirmDisabled={true}
      />
    );
  }

  if (isError || !data) {
    return (
      <AssignmentFormLayout
        title='강의 수정'
        content={
          <div className='flex justify-center py-20 text-light-black'>
            데이터를 불러오는 중에 오류가 발생했습니다.
          </div>
        }
        onCancel={() => navigate(ROUTES.ADMIN.ROOT)}
        onConfirm={() => {}}
        confirmDisabled={true}
      />
    );
  }

  const defaultValues: Partial<CourseFormValues> = {
    title: data.title,
    section: data.section,
    year: String(data.year) as CourseFormValues['year'],
    semester: SEMESTER_DISPLAY_MAP[data.semester],
    description: data.description,
  };

  return (
    <AssignmentFormLayout
      title='강의 수정'
      content={
        <CourseForm
          ref={formRef}
          key={courseId}
          defaultValues={defaultValues}
          onSubmit={submit}
        />
      }
      onCancel={() => navigate(ROUTES.ADMIN.ROOT)}
      onConfirm={() => {
        formRef.current?.dispatchEvent(
          new Event('submit', {cancelable: true, bubbles: true})
        );
      }}
      confirmDisabled={isPending}
    />
  );
};
