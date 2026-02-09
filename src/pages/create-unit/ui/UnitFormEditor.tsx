import {useForm, type FieldValues} from 'react-hook-form';
import Button from '@/components/common/Button';
import BinIcon from '@/assets/svg/binIcon.svg?react';
import LabeledInput from '@/components/admin/form/LabeledInput';
import type {Unit} from '@/models/course';

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
    <div className='flex flex-col h-full p-5 '>
      {/* 단원 편집 폼 */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=' bg-background flex flex-col flex-1 rounded-[30px] overflow-hidden'>
        {/* 폼 헤더 */}
        <div className='bg-[#EDE9FF] flex justify-between items-center px-7.5 py-4'>
          {/* TODO: 단원 Index 추가하기 */}
          <h3 className='text-lg font-medium'>1. 단원</h3>
          <Button
            color='primary'
            content='icon'
            className='w-9 h-9 rounded-full'>
            <BinIcon />
          </Button>
        </div>

        {/* 폼 본문 */}
        <div className='flex-1 p-7.5 overflow-y-auto custom-scrollbar space-y-8'>
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

          <hr className='border-stroke' />

          {/* 문제 등록 섹션 */}
          <section>
            <h4 className='text-base/6 font-medium'>문제 등록</h4>

            {
              /* 문제 리스트 */
              // TODO: 문제 리스트 컴포넌트 추가
            }
          </section>
        </div>
      </form>

      {
        /* 문제 등록 */
        // TODO: 문제 등록 컴포넌트로 교체 필요
      }

      {/* 제출 버튼 */}
      <div className='mt-8 flex justify-end gap-5.5'>
        <Button color='outlinePurple'>취소</Button>
        <Button>저장</Button>
      </div>
    </div>
  );
};

export default UnitFormEditor;
