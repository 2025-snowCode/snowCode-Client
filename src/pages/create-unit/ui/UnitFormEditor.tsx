import {useForm, type FieldValues} from 'react-hook-form';
import Button from '@/components/common/Button';
import BinIcon from '@/assets/svg/binIcon.svg?react';
import LabeledInput from '@/components/admin/form/LabeledInput';
import type {Unit} from '@/models/course';
import {SortableAssignmentList} from './SortableAssignmentList';

const UnitFormEditor = ({unit}: {unit: Unit}) => {
  const {
    register,
    handleSubmit,
    // formState: {errors, isSubmitting},
    reset,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
  };

  return (
    <div className='flex flex-col w-full h-full p-5'>
      {/* 단원 편집 폼 */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-background h-[670px] flex flex-col overflow-x-hidden custom-scrollbar rounded-[30px]'>
        {/* 폼 헤더 */}
        <div className='bg-[#EDE9FF] flex justify-between items-center px-7.5 py-4'>
          {/* TODO: 단원 Index 추가하기 */}
          <h3 className='text-lg font-medium'>1. 단원</h3>
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
              {...register('title', {
                required: '단원 제목은 필수 입력 사항입니다.',
              })}
              label='제목'
              placeholder='단원 제목을 입력하세요'
            />
          </section>

          {/* 날짜 섹션 (공개일, 마감일) */}
          <section className='grid grid-cols-2 gap-5.5'>
            <LabeledInput
              {...register('releaseDate', {
                required: '공개일은 필수 입력 사항입니다.',
              })}
              label='공개일'
              type='date'
              placeholder='날짜를 선택하세요'
            />
            <LabeledInput
              {...register('dueDate', {
                required: '마감일은 필수 입력 사항입니다.',
              })}
              label='마감일'
              type='date'
              placeholder='마감일을 선택하세요'
            />
          </section>

          <hr className='border-stroke mb-7' />

          {/* 문제 등록 섹션 */}
          <section>
            <SortableAssignmentList assignmentList={unit.assignments} />
          </section>
        </div>
      </form>

      {/* 제출 버튼 */}
      <div className='mt-6 mb-2 flex justify-end gap-5.5'>
        <Button color='outlinePurple'>취소</Button>
        <Button>저장</Button>
      </div>
    </div>
  );
};

export default UnitFormEditor;
devicePixelRatio;
