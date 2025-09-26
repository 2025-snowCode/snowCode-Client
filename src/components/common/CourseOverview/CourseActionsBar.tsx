import Button from '../Button';

const CourseActionsBar = ({isActive}: {isActive: boolean}) => {
  return (
    <div className='flex gap-5'>
      <Button
        theme={`${isActive ? 'primaryTransparent' : 'primaryWhite'}`}
        text='학생 목록'
      />
      <Button
        theme={`${isActive ? 'primaryWhite' : 'primaryPurple'}`}
        text='단원 추가'
      />
    </div>
  );
};

export default CourseActionsBar;
