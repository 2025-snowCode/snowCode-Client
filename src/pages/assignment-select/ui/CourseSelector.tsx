import LabeledDropdown from '@/components/admin/form/LabeledDropdown';

const CourseSelector = ({options}: {options: string[]}) => {
  return (
    <div className='w-81'>
      <LabeledDropdown
        options={options}
        placeholder='강의를 선택하세요.'
        className='truncate'
      />
    </div>
  );
};
export default CourseSelector;
