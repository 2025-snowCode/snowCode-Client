import AssignmentFormLayout from '@/components/admin/assignments/AssignmentFormLayout';
import LabeledInput from '@/components/admin/form/LabeledInput';

const AssignmentCreatePage = () => {
  return (
    <AssignmentFormLayout
      title='문제 등록 및 수정'
      content={
        <div className='space-y-6 max-w-[728px]'>
          <div className='grid grid-cols-[minmax(0,1fr)_160px] gap-6'>
            <LabeledInput
              label='문제 제목'
              placeholder='문제 제목을 입력하세요'
              className='w-full'
            />
            <LabeledInput
              label='점수'
              placeholder='점수를 입력하세요'
              className='w-full'
            />
          </div>

          <LabeledInput
            label='문제 설명'
            placeholder='문제 설명을 입력하세요'
            className='w-full'
          />
          <div className='grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_200px] gap-4'>
            <LabeledInput
              label='입력 예제'
              placeholder='입력하세요'
              className='w-full'
            />
            <LabeledInput
              label='출력 예제'
              placeholder='입력하세요'
              className='w-full'
            />
            <LabeledInput
              label='공개 여부'
              variant='dropdown'
              className='w-full'
            />
          </div>

          {/* 추가 버튼: 내용만큼만 */}
          <button className='w-fit self-start px-3 py-1.5 bg-purple-stroke rounded'>
            + 추가
          </button>
        </div>
      }
      onCancel={() => {}}
      onConfirm={() => {}}
    />
  );
};

export default AssignmentCreatePage;
