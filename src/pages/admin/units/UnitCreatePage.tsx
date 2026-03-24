import {UnitForm} from './ui/UnitForm';
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import {useCreateUnit} from '@/features/unit/create-unit/model/useCreateUnit';
import {useRef} from 'react';
import useUnitStore from '@/entities/unit/model/useUnitStore';
import type {TUnitLayoutContext, UnitFormHandle} from './model/types';
import {ROUTES} from '@/shared/config/routes';
import UnitFormLayout from './ui/UnitFormLayout';

const UnitCreatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {courseId} = useParams();
  const formRef = useRef<UnitFormHandle>(null);
  const {unitCount} = useOutletContext<TUnitLayoutContext>();
  const {title, releaseDate, dueDate, assignments, storeFormData, resetStore} =
    useUnitStore();

  const {submit, isPending} = useCreateUnit({courseId: Number(courseId)});

  // 과제 선택 페이지로 이동
  const onSelectAssignments = () => {
    const {title, releaseDate, dueDate} = formRef.current?.getValues() ?? {};
    storeFormData(title ?? '', releaseDate ?? '', dueDate ?? '');
    navigate(ROUTES.ADMIN.ASSIGNMENTS.SELECT, {
      state: {backPath: location.pathname},
    });
  };

  const defaultValues = {
    title,
    releaseDate,
    dueDate,
    assignmentIds: assignments.map((a) => a.id),
  };

  return (
    <UnitFormLayout
      unitNumber={unitCount + 1}
      onSave={() => formRef.current?.requestSubmit()}
      onCancel={() => {
        formRef.current?.reset();
        resetStore();
      }}
      isPending={isPending}>
      <UnitForm
        ref={formRef}
        onSubmit={submit}
        assignmentList={assignments}
        onSelectAssignments={onSelectAssignments}
        defaultValues={defaultValues}
        assignmentListKey='create'
      />
    </UnitFormLayout>
  );
};

export default UnitCreatePage;
