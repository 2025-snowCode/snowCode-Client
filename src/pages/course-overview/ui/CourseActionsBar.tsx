import {buttonStyles} from '@/shared/ui/button/button-styles';
import {Link} from 'react-router-dom';

interface CourseActionsBarProps {
  courseId: number;
  isActiveCourse: boolean;
}
// 강의 관리 버튼 바 (관리자 전용)
const CourseActionsBar = ({
  courseId,
  isActiveCourse,
}: CourseActionsBarProps) => {
  return (
    <article className='flex gap-5'>
      <Link
        to='/admin/student'
        className={buttonStyles({
          color: `${isActiveCourse ? 'outlineWhite' : 'outlinePurple'}`,
        })}>
        학생 목록
      </Link>
      <Link
        to={`/admin/units/${courseId}`}
        className={buttonStyles({
          color: `${isActiveCourse ? 'outlinePurple' : 'primary'}`,
        })}>
        단원 추가
      </Link>
    </article>
  );
};

export default CourseActionsBar;
