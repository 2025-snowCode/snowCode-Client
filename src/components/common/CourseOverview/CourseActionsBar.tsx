import {useNavigate} from 'react-router-dom';
import Button from '@/components/common/Button';

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
      <Button color='outlineWhite'>학생 목록</Button>
      <Button color='outlinePurple'>단원 추가</Button>
    </div>
  );
};

export default CourseActionsBar;
