import AssignmentFormLayout from '@/widgets/assignment-form-layout/ui/AssignmentFormLayout';
import LabeledInput from '@/shared/ui/LabeledInput';
import FileUpload from '@/shared/ui/FileUpload';
import {useState} from 'react';
import LabeledDropdown from '@/shared/ui/LabeledDropdown';
import Button from '@/shared/ui/Button';
import AddIcon from '@/assets/svg/addIcon.svg?react';

const PUBLIC_OPTIONS = ['공개', '비공개'];

const AssignmentCreatePage = () => {
  const [examples, setExamples] = useState([{input: '', output: '', 공개: ''}]);

  const handleAddExample = () => {
    setExamples([...examples, {input: '', output: '', 공개: ''}]);
  };

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
          <div className='space-y-2'>
            {examples.map((_, idx) => (
              <div
                key={idx}
                className='grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_200px] gap-4'>
                <LabeledInput
                  label={idx === 0 ? '입력 예제' : ''}
                  placeholder='입력하세요'
                  className='w-full'
                />
                <LabeledInput
                  label={idx === 0 ? '출력 예제' : ''}
                  placeholder='입력하세요'
                  className='w-full'
                />
                <LabeledDropdown
                  label={idx === 0 ? '공개 여부' : ''}
                  options={PUBLIC_OPTIONS}
                  className='w-full'
                />
              </div>
            ))}
          </div>

          <Button
            color='tonal'
            size='compact'
            content='mixed'
            onClick={handleAddExample}>
            <AddIcon width={12} height={12} />
            추가
          </Button>
          <FileUpload
            label='테스트 케이스'
            onFileChange={() => {}}
            className='mb-9'
          />
        </div>
      }
      onCancel={() => {}}
      onConfirm={() => {}}
    />
  );
};

export default AssignmentCreatePage;
