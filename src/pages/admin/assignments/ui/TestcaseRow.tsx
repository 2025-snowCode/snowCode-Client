import LabeledInput from '@/shared/ui/LabeledInput';
import LabeledDropdown from '@/shared/ui/LabeledDropdown';

const PUBLIC_OPTIONS = ['공개', '비공개'];

interface TestcaseRowProps {
  index: number;
  testcase: string;
  answer: string;
  onTestcaseChange: (value: string) => void;
  onAnswerChange: (value: string) => void;
}

const TestcaseRow = ({
  index,
  testcase,
  answer,
  onTestcaseChange,
  onAnswerChange,
}: TestcaseRowProps) => {
  const isFirst = index === 0;

  return (
    <div className='grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_200px] gap-4'>
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
      />
    </div>
  );
};

export default TestcaseRow;
