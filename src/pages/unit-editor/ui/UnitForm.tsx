import {useForm} from 'react-hook-form';
import Button from '@/shared/ui/button/Button';
import BinIcon from '@/assets/svg/binIcon.svg?react';
import LabeledInput from '@/shared/ui/LabeledInput';
import {UnitAssignmentList} from './UnitAssignmentList';
import {zodResolver} from '@hookform/resolvers/zod';
import {type UnitFormProps} from '../model/types';
import AddIcon from '@/assets/svg/addIcon.svg?react';
import {EmptyState} from '@/shared/ui/EmptyState';
import {
  unitFormSchema,
  type TUnitFormSchema,
} from '@/entities/unit/model/types';
import {useLocation, useNavigate} from 'react-router-dom';
import useUnitStore from '@/entities/unit/model/useUnitStore';

export const UnitForm = ({
  unit,
  unitIndex,
  mode,
  onCreateUnit,
  onUpdateUnit,
  onDeleteUnit,
}: UnitFormProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    storeFormData,
    resetStore,
    title: storedTitle,
    releaseDate: storedReleaseDate,
    dueDate: storedDueDate,
    assignments,
  } = useUnitStore();

  const assignmentIds = assignments.map((assignment) => assignment.id);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: {errors, isSubmitting},
  } = useForm<TUnitFormSchema>({
    resolver: zodResolver(unitFormSchema),
    values:
      mode === 'creating'
        ? {
            title: storedTitle,
            releaseDate: storedReleaseDate,
            dueDate: storedDueDate,
            assignmentIds: assignmentIds,
          }
        : {
            title: unit?.title || '',
            releaseDate: unit?.releaseDate || '',
            dueDate: unit?.dueDate || '',
          },
  });

  // 단원 생성/업데이트 핸들러
  const onSubmit = async (data: TUnitFormSchema) => {
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
    resetStore(); // 폼 데이터 초기화
    reset();
  };

  // 문제 선택 페이지로 이동 핸들러
  const handleAssignmentSelect = () => {
    const {title, releaseDate, dueDate} = getValues();
    storeFormData(title, releaseDate, dueDate);
    navigate('/admin/assignments/select', {
      state: {
        mode,
        unitId: unit?.id ?? null,
        currentIndex: unitIndex,
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
        <div className='flex-1 p-7.5 space-y-8 overflow-y-auto '>
          {/* 단원 제목 섹션 */}
          <section className='grid grid-cols-2 gap-5.5'>
            <LabeledInput
              {...register('title')}
              label='제목'
              placeholder='단원 제목을 입력하세요'
            />
          </section>

          {/* 날짜 섹션 (공개일, 마감일) */}
          <section className='grid grid-cols-2 gap-5.5'>
            <LabeledInput
              {...register('releaseDate')}
              label='공개일'
              type='date'
              placeholder='날짜를 선택하세요'
            />
            <LabeledInput
              {...register('dueDate')}
              label='마감일'
              type='date'
              placeholder='마감일을 선택하세요'
            />
            <span className='col-span-2 text-xs text-badge-red -mt-3 h-1'>
              {errors.dueDate?.message}
            </span>
          </section>

          <hr className='border-stroke mb-7 -mt-3' />

          {/* 문제 등록 섹션 */}
          <section className=''>
            <h4 className='text-base/6 font-medium'>문제 등록</h4>

            {/* 드래그 앤 드롭 가능한 문제 리스트 */}
            {mode === 'editing' && unit && unit.assignmentCount > 0 ? (
              <UnitAssignmentList assignmentList={unit.assignments} />
            ) : assignments.length > 0 ? (
              <UnitAssignmentList assignmentList={assignments} />
            ) : (
              <EmptyState className='mt-4 mb-5'>
                등록된 문제가 없습니다.
              </EmptyState>
            )}

            {/* 문제 연결 버튼 */}
            <div className='mt-3.5'>
              <Button
                onClick={handleAssignmentSelect}
                color='tonal'
                size='compact'
                content='mixed'
                disabled={mode === 'editing'}>
                <AddIcon className='w-3 h-3' />
                문제 연결
              </Button>
            </div>
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
          formID={`unit-form-${unitIndex}`}
          disabled={isSubmitting}>
          저장
        </Button>
      </div>
    </div>
  );
};
