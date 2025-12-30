import Button from '../Button';

const CourseActionsBar = ({isActive}: {isActive: boolean}) => {
  return (
    <div className='flex gap-5'>
      <Button color='outlineWhite'>학생 목록</Button>
      <Button color='outlinePurple'>단원 추가</Button>
    </div>
  );
};

export default CourseActionsBar;
