import LabeledDropdown from '@/shared/ui/LabeledDropdown';

interface CourseSelectorProps {
  options: string[];
  value: string;
  onSelect: (value: string) => void;
}

export const CourseSelector = ({
  options,
  value,
  onSelect,
}: CourseSelectorProps) => {
  return (
    <div className='w-90'>
      <LabeledDropdown
        options={options}
        value={value}
        onSelect={onSelect}
        placeholder='강의를 선택하세요.'
        className='truncate'
      />
    </div>
  );
};
