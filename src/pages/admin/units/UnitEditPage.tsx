import {useQuery} from '@tanstack/react-query';
import {UnitForm} from './ui/UnitForm';
import {unitQueries} from '@/entities/unit/api/unitQueries';
import {useOutletContext, useParams} from 'react-router-dom';
import {useEditUnit} from '@/features/unit/edit-unit/model/useEditUnit';
import {useRef} from 'react';
import type {TUnitLayoutContext, UnitFormHandle} from './model/types';
import UnitFormLayout from './ui/UnitFormLayout';

const UnitEditPage = () => {
  const {courseId, unitId} = useParams();
  const formRef = useRef<UnitFormHandle>(null);
  const {unitList} = useOutletContext<TUnitLayoutContext>();

  const {data: unit, isLoading} = useQuery(
    unitQueries.getUnitDetail(Number(unitId))
  );

  const {submit, remove, isUpdating} = useEditUnit({
    courseId: Number(courseId),
    unitId: Number(unitId),
  });

  if (isLoading || !unit) return null;

  const defaultValues = {
    title: unit.title,
    releaseDate: unit.releaseDate,
    dueDate: unit.dueDate,
  };

  const unitIndex = unitList.findIndex((u) => u.id === Number(unitId)) + 1;

  return (
    <UnitFormLayout
      unitNumber={unitIndex}
      onDelete={remove}
      onSave={() => formRef.current?.requestSubmit()}
      onCancel={() => formRef.current?.reset()}
      isPending={isUpdating}>
      <UnitForm
        key={unitId}
        ref={formRef}
        onSubmit={submit}
        assignmentList={unit.assignments}
        assignmentListKey={`edit-${unit.id}`}
        defaultValues={defaultValues}
      />
    </UnitFormLayout>
  );
};

export default UnitEditPage;
