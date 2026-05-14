import LabeledInput from '@/shared/ui/LabeledInput';
import LabeledDropdown from '@/shared/ui/LabeledDropdown';
import BinIcon from '@/assets/svg/binIcon.svg?react';

const PUBLIC_OPTIONS = ['공개', '비공개'];

interface TestcaseRowProps {
  index: number;
  testcase: string;
  answer: string;
  isPublic: boolean;
  onTestcaseChange: (value: string) => void;
  onAnswerChange: (value: string) => void;
  onHiddenChange: (value: boolean) => void;
  onDelete: () => void;
}

const TestcaseRow = ({
  index,
  testcase,
  answer,
  isPublic,
  onTestcaseChange,
  onAnswerChange,
  onHiddenChange,
  onDelete,
}: TestcaseRowProps) => {
  const isFirst = index === 0;

  return (
    <div className='grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_200px_32px] items-end gap-4'>
      <LabeledInput
        label={isFirst ? '입력 예제' : ''}
        placeholder='입력하세요'
        className='w-full'
        value={testcase}
        onChange={(e) => onTestcaseChange(e.target.value)}
      />
      <LabeledInput
        label={isFirst ? '출력 예제' : ''}
        placeholder='입력하세요'
        className='w-full'
        value={answer}
        onChange={(e) => onAnswerChange(e.target.value)}
      />
      <LabeledDropdown
        label={isFirst ? '공개 여부' : ''}
        options={PUBLIC_OPTIONS}
        className='w-full'
        value={isPublic ? '공개' : '비공개'}
        onSelect={(value) => onHiddenChange(value === '공개')}
      />
      <button
        type='button'
        aria-label='테스트 케이스 삭제'
        onClick={onDelete}
        className='mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary hover:opacity-80'>
        <BinIcon className='h-3.5 w-3.5' />
      </button>
    </div>
  );
};

export default TestcaseRow;
