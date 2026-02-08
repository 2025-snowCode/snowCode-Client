import Button from '@/components/common/Button';
import {Link} from 'react-router-dom';

// 강의 관리 버튼 바 (관리자 전용)
const CourseActionsBar = ({isActiveCourse}: {isActiveCourse: boolean}) => {
  return (
    <article className='flex gap-5'>
      <Link to=''>
        <Button color={isActiveCourse ? 'outlineWhite' : 'outlinePurple'}>
          학생 목록
        </Button>
      </Link>
      <Link to=''>
        <Button color={isActiveCourse ? 'outlinePurple' : 'primary'}>
          단원 추가
        </Button>
      </Link>
    </article>
  );
};

export default CourseActionsBar;
