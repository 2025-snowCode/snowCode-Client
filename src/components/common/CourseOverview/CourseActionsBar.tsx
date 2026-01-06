import {useNavigate} from 'react-router-dom';
import Button from '../Button';

interface CourseActionsBarProps {
  isActive: boolean;
  title: string;
  section: string;
}

const CourseActionsBar = ({isActive, title, section}: CourseActionsBarProps) => {
  const navigate = useNavigate();

  const handleStudentListClick = () => {
    navigate(`/admin/student?course=${title} (${section})`);
  };

  return (
    <div className='flex gap-5'>
      <Button
        theme={`${isActive ? 'primaryTransparent' : 'primaryWhite'}`}
        text='학생 목록'
        onClick={handleStudentListClick}
      />
      <Button
        theme={`${isActive ? 'primaryWhite' : 'primaryPurple'}`}
        text='단원 추가'
      />
    </div>
  );
};

export default CourseActionsBar;
