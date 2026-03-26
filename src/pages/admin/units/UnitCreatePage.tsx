import {UnitForm} from './ui/UnitForm';
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import {useCreateUnit} from '@/features/unit/create-unit/model/useCreateUnit';
import {useEffect, useRef} from 'react';
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

  const isFromAssignmentSelct = !!location.state?.fromAssignmentSelect;

  useEffect(() => {
    if (!isFromAssignmentSelct) {
      resetStore();
    }
  }, [isFromAssignmentSelct, resetStore]);

  const {submit, isPending} = useCreateUnit({courseId: Number(courseId)});

  // 과제 선택 페이지로 이동
  const onSelectAssignments = () => {
    const {title, releaseDate, dueDate} = formRef.current?.getValues() ?? {};
    storeFormData(title ?? '', releaseDate ?? '', dueDate ?? '');
    navigate(ROUTES.ADMIN.ASSIGNMENTS.SELECT, {
      state: {backPath: location.pathname},
    });
  };

  const isFromAssignmentSelect = !!location.state?.fromAssignmentSelect;

  const defaultValues = isFromAssignmentSelect
    ? {title, releaseDate, dueDate, assignmentIds: assignments.map((a) => a.id)}
    : {title: '', releaseDate: '', dueDate: '', assignmentIds: []};

  return (
    <UnitFormLayout
      unitNumber={unitCount + 1}
      onSave={() => formRef.current?.requestSubmit()}
      onCancel={() => {
        formRef.current?.reset({
          title: '',
          releaseDate: '',
          dueDate: '',
          assignmentIds: [],
        });
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
