import LabeledDropdown from '@/components/admin/form/LabeledDropdown';

const CourseSelector = ({
  options,
  onSelect,
}: {
  options: string[];
  onSelect: (value: string) => void;
}) => {
  return (
    <div className='w-90'>
      <LabeledDropdown
        options={options}
        onSelect={onSelect}
        placeholder='강의를 선택하세요.'
        className='truncate'
      />
    </div>
  );
};
export default CourseSelector;
