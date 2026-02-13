import {useForm} from 'react-hook-form';
import Button from '@/components/common/Button';
import BinIcon from '@/assets/svg/binIcon.svg?react';
import LabeledInput from '@/components/admin/form/LabeledInput';
import {SortableAssignmentList} from './SortableAssignmentList';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  unitFormSchema,
  type TUnitFormSchema,
  type UnitFormEditorProps,
} from '../model/types';
import AddIcon from '@/assets/svg/addIcon.svg?react';
import {EmptyState} from '@/components/common/EmptyState';
import {useState} from 'react';

const UnitFormEditor = ({unit, unitIndex, isEditing}: UnitFormEditorProps) => {
  const [assignmentIds, setAssignmentIds] = useState<number[]>([]);

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset,
  } = useForm<TUnitFormSchema>({
    resolver: zodResolver(unitFormSchema),
    values:
      isEditing === false
        ? {
            title: '',
            releaseDate: '',
            dueDate: '',
            assignmentIds: [],
          }
        : {
            title: unit?.title || '',
            releaseDate: unit?.releaseDate || '',
            dueDate: unit?.dueDate || '',
          },
  });

  const onSubmit = async (data: TUnitFormSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
  };

  return (
    <div className='flex flex-col w-full h-full p-5'>
      {/* 단원 편집 폼 */}
      <form
        id='unit-form'
        onSubmit={handleSubmit(onSubmit)}
        className='bg-background h-167.5 flex flex-col overflow-x-hidden custom-scrollbar rounded-[30px]'>
        {/* 폼 헤더 */}
        <div className='bg-[#EDE9FF] flex justify-between items-center px-7.5 py-4'>
          {/* TODO: 단원 Index 추가하기 */}
          <h3 className='text-lg font-medium'>{unitIndex}. 단원</h3>
          <Button
            color='primary'
            content='icon'
            size='none'
            className='w-9 h-9 rounded-full'>
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
            {errors.dueDate && (
              <span className='col-span-2 text-xs text-badge-red -mt-2'>
                {errors.dueDate.message}
              </span>
            )}
          </section>

          <hr className='border-stroke mb-7' />

          {/* 문제 등록 섹션 */}
          <section className=''>
            <h4 className='text-base/6 font-medium'>문제 등록</h4>

            {/* 드래그 앤 드롭 가능한 문제 리스트 */}
            {!unit || unit.assignmentCount === 0 ? (
              <EmptyState className='mt-4 mb-5'>
                등록된 문제가 없습니다.
              </EmptyState>
            ) : (
              <SortableAssignmentList assignmentList={unit.assignments} />
            )}

            {/* 문제 연결 버튼 */}
            <div className='mt-3.5'>
              <Button color='tonal' size='compact' content='mixed'>
                <AddIcon className='w-3 h-3' />
                문제 연결
              </Button>
            </div>
          </section>
        </div>
      </form>

      {/* 제출 버튼 */}
      <div className='mt-6 mb-2 flex justify-end gap-5.5'>
        <Button color='outlinePurple'>취소</Button>
        <Button type='submit' formID='unit-form' disabled={isSubmitting}>
          저장
        </Button>
      </div>
    </div>
  );
};

export default UnitFormEditor;
