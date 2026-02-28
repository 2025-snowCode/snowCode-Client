import {useForm} from 'react-hook-form';
import Button from '@/shared/ui/button/Button';
import BinIcon from '@/assets/svg/binIcon.svg?react';
import LabeledInput from '@/shared/ui/LabeledInput';
import {UnitAssignmentList} from './UnitAssignmentList';
import {zodResolver} from '@hookform/resolvers/zod';
import {type UnitFormProps} from '../model/types';
import AddIcon from '@/assets/svg/addIcon.svg?react';
import {EmptyState} from '@/shared/ui/EmptyState';
import {useLocation, useNavigate} from 'react-router-dom';
import useUnitStore from '@/entities/unit/model/useUnitStore';
import {unitFormSchema} from '@/entities/unit/model/schemas';
import type {TUnitFormSchema} from '@/entities/unit/model/types';

export const UnitForm = ({
  unit,
  unitIndex,
  mode,
  onCreateUnit,
  onUpdateUnit,
  onDeleteUnit,
  isPending,
}: UnitFormProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    storeFormData,
    resetStore,
    title: storedTitle,
    releaseDate: storedReleaseDate,
    dueDate: storedDueDate,
    assignments: storedAssignments,
  } = useUnitStore();

  const currentAssignmentList =
    mode === 'editing' ? (unit?.assignments ?? []) : storedAssignments;

  const assignmentListKey =
    mode === 'editing' ? `edit-${unit?.id}` : 'creating-assignments';

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: {errors},
  } = useForm<TUnitFormSchema>({
    resolver: zodResolver(unitFormSchema),
    values:
      mode === 'creating'
        ? {
            title: storedTitle,
            releaseDate: storedReleaseDate,
            dueDate: storedDueDate,
            assignmentIds: storedAssignments.map((a) => a.id),
          }
        : {
            title: unit?.title || '',
            releaseDate: unit?.releaseDate || '',
            dueDate: unit?.dueDate || '',
          },
  });

  // 단원 생성/업데이트 핸들러
  const onSubmit = (data: TUnitFormSchema) => {
    if (mode === 'editing' && unit) {
      onUpdateUnit(unit.id, data);
      return;
    }

    onCreateUnit(data);
  };

  // 단원 삭제 핸들러
  const handleDeleteUnit = () => {
    if (unit) {
      onDeleteUnit(unit.id);
    }
  };

  // 단원 편집 취소 핸들러
  const handleCancel = () => {
    if (mode === 'creating') resetStore();
    reset();
  };

  // 문제 선택 페이지로 이동 핸들러
  const handleAssignmentSelect = () => {
    const {title, releaseDate, dueDate} = getValues();
    storeFormData(title, releaseDate, dueDate);
    navigate('/admin/assignments/select', {
      state: {
        backPath: location.pathname,
      },
    });
  };

  return (
    <div className='flex flex-col w-full h-full p-5'>
      {/* 단원 편집 폼 */}
      <form
        id={`unit-form-${unitIndex}`}
        onSubmit={handleSubmit(onSubmit)}
        className='bg-background h-167.5 flex flex-col overflow-x-hidden custom-scrollbar rounded-[30px]'>
        {/* 폼 헤더 */}
        <div className='bg-[#EDE9FF] flex justify-between items-center px-7.5 py-4'>
          <h3 className='text-lg font-medium'>{unitIndex}. 단원</h3>
          <Button
            onClick={handleDeleteUnit}
            color='primary'
            content='icon'
            size='none'
            className={`w-9 h-9 rounded-full ${mode !== 'editing' ? 'invisible' : ''}`}>
            <BinIcon className='w-4 h-4' />
          </Button>
        </div>

        {/* 폼 본문 */}
        <div className='flex-1 p-7.5 space-y-3 overflow-y-auto '>
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
          <section className=''>
            <h4 className='text-base/6 font-medium'>문제 등록</h4>

            {/* 드래그 앤 드롭 가능한 문제 리스트 */}
            {currentAssignmentList.length > 0 ? (
              <UnitAssignmentList
                key={assignmentListKey}
                assignmentList={currentAssignmentList}
              />
            ) : (
              <EmptyState className='mt-4 mb-5'>
                등록된 문제가 없습니다.
              </EmptyState>
            )}

            {/* 문제 연결 버튼 */}
            {mode === 'creating' && (
              <div className='mt-3.5'>
                <Button
                  onClick={handleAssignmentSelect}
                  color='tonal'
                  size='compact'
                  content='mixed'>
                  <AddIcon className='w-3 h-3' />
                  문제 연결
                </Button>
              </div>
            )}
          </section>
        </div>
      </form>

      {/* 제출 버튼 */}
      <div className='mt-6 mb-2 flex justify-end gap-5.5'>
        <Button onClick={handleCancel} color='outlinePurple'>
          취소
        </Button>
        <Button
          type='submit'
          form={`unit-form-${unitIndex}`}
          disabled={isPending}>
          저장
        </Button>
      </div>
    </div>
  );
};
