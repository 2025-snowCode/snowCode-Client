import {useNavigate} from 'react-router-dom';
import {ROUTES} from '@/shared/config/routes';
import AssignmentFormLayout from '@/widgets/assignment-form-layout/ui/AssignmentFormLayout';
import {CourseForm} from '@/widgets/course-form/ui/CourseForm';
import {useCreateCourse} from '@/features/course/create-course/model/useCreateCourse';

export const CourseCreatePage = () => {
  const navigate = useNavigate();
  const {submit, isPending} = useCreateCourse();

  return (
    <AssignmentFormLayout
      title='강의 개설'
      content={<CourseForm onSubmit={submit} />}
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
