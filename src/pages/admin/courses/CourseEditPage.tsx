import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import {ROUTES} from '@/shared/config/routes';
import AssignmentFormLayout from '@/widgets/assignment-form-layout/ui/AssignmentFormLayout';
import {CourseForm} from '@/widgets/course-form/ui/CourseForm';
import {useEditCourse} from '@/features/course/edit-course/model/useEditCourse';
import {courseQueries} from '@/entities/course/api/courseQueries';
import {formatSemester} from '@/shared/lib/course';
import type {CourseFormValues} from '@/features/course/create-course/model/schemas';
import {useRef} from 'react';

export const CourseEditPage = () => {
  const {courseId: id} = useParams<{courseId: string}>();
  const courseId = Number(id);
  const isValidId = id !== undefined && !isNaN(courseId);
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const {data, isLoading, isError} = useQuery({
    ...courseQueries.getCourseDetails(courseId),
    enabled: isValidId,
  });
  const {submit, isPending} = useEditCourse(courseId);

  if (!isValidId) {
    return <Navigate to={ROUTES.ADMIN.ROOT} />;
  }

  if (isError) {
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

  if (isLoading || !data) {
    return (
      <AssignmentFormLayout
        title='강의 수정'
        content={
          <div className='flex justify-center py-20 text-light-black'>
            데이터를 불러오는 중입니다.
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
    semester: formatSemester(data.semester) as CourseFormValues['semester'],
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
      onConfirm={() => formRef.current?.requestSubmit()}
      confirmDisabled={isPending}
    />
  );
};
