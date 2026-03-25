import {useForm} from 'react-hook-form';
import Button from '@/shared/ui/button/Button';
import LabeledInput from '@/shared/ui/LabeledInput';
import {UnitAssignmentList} from '@/pages/admin/units/ui/UnitAssignmentList';
import {zodResolver} from '@hookform/resolvers/zod';
import {type UnitFormProps} from '@/pages/admin/units/model/types';
import AddIcon from '@/assets/svg/addIcon.svg?react';
import {EmptyState} from '@/shared/ui/EmptyState';
import {unitFormSchema} from '@/entities/unit/model/schemas';
import type {TUnitFormSchema} from '@/entities/unit/model/schemas';
import {useImperativeHandle, useRef} from 'react';

export const UnitForm = ({
  ref,
  defaultValues,
  onSubmit,
  assignmentList,
  assignmentListKey,
  onSelectAssignments,
}: UnitFormProps) => {
  const internalFormRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: {errors},
  } = useForm<TUnitFormSchema>({
    resolver: zodResolver(unitFormSchema),
    defaultValues,
  });

  useImperativeHandle(ref, () => ({
    reset,
    getValues,
    requestSubmit: () => internalFormRef.current?.requestSubmit(),
  }));

  return (
    <form
      ref={internalFormRef}
      onSubmit={handleSubmit(onSubmit)}
      className='flex-1 p-7.5 space-y-3 overflow-y-auto '>
      {/* 단원 제목 섹션 */}
      <section className='grid grid-cols-2 gap-5.5'>
        <LabeledInput
          {...register('title')}
          label='제목'
          placeholder='단원 제목을 입력하세요'
          errorMessage={errors.title?.message}
        />
      </section>

      {/* 날짜 섹션 (공개일, 마감일) */}
      <section className='grid grid-cols-2 gap-5.5'>
        <LabeledInput
          {...register('releaseDate')}
          label='공개일'
          type='date'
          placeholder='날짜를 선택하세요'
          errorMessage={errors.releaseDate?.message}
        />
        <LabeledInput
          {...register('dueDate')}
          label='마감일'
          type='date'
          placeholder='마감일을 선택하세요'
          errorMessage={errors.dueDate?.message}
        />
      </section>

      <hr className='border-stroke mb-5' />

      {/* 문제 등록 섹션 */}
      <section>
        <h4 className='text-base/6 font-medium'>문제 등록</h4>

        {/* 드래그 앤 드롭 가능한 문제 리스트 */}
        {assignmentList.length > 0 ? (
          <UnitAssignmentList
            key={assignmentListKey}
            assignmentList={assignmentList}
          />
        ) : (
          <EmptyState className='mt-4 mb-5'>등록된 문제가 없습니다.</EmptyState>
        )}

        {/* 문제 연결 버튼 */}
        {onSelectAssignments && (
          <div className='mt-3.5'>
            <Button
              onClick={onSelectAssignments}
              color='tonal'
              size='compact'
              content='mixed'>
              <AddIcon className='w-3 h-3' />
              문제 연결
            </Button>
          </div>
        )}
      </section>
    </form>
  );
};
