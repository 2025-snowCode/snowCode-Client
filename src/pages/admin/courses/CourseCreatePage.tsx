import {useNavigate} from 'react-router-dom';
import {ROUTES} from '@/shared/config/routes';
import AssignmentFormLayout from '@/widgets/assignment-form-layout/ui/AssignmentFormLayout';
import {CourseForm} from '@/widgets/course-form/ui/CourseForm';
import {useCreateCourse} from '@/features/course/create-course/model/useCreateCourse';
import { useRef } from 'react';

export const CourseCreatePage = () => {
  const navigate = useNavigate();
  const {submit, isPending} = useCreateCourse();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <AssignmentFormLayout
      title='강의 개설'
      content={<CourseForm ref={formRef} onSubmit={submit} />}
      onCancel={() => navigate(ROUTES.ADMIN.ROOT)}
      onConfirm={() => formRef.current?.requestSubmit}
      confirmDisabled={isPending}
    />
  );
};
