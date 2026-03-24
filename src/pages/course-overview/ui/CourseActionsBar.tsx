import {ROUTES} from '@/shared/config/routes';
import {buttonStyles} from '@/shared/ui/button/button-styles';
import {Link} from 'react-router-dom';

interface CourseActionsBarProps {
  courseId: number;
  isActiveCourse: boolean;
  firstUnitId?: number;
}

const CourseActionsBar = ({
  courseId,
  isActiveCourse,
  firstUnitId,
}: CourseActionsBarProps) => {
  const unitPath =
    isActiveCourse && firstUnitId
      ? ROUTES.ADMIN.UNITS.EDIT(courseId, firstUnitId)
      : ROUTES.ADMIN.UNITS.CREATE(courseId);

  return (
    <article className='flex gap-5'>
      <Link
        to={ROUTES.ADMIN.STUDENT.ROOT(courseId)}
        className={buttonStyles({
          color: `${isActiveCourse ? 'outlineWhite' : 'outlinePurple'}`,
        })}>
        학생 목록
      </Link>
      <Link
        to={unitPath}
        className={buttonStyles({
          color: `${isActiveCourse ? 'outlinePurple' : 'primary'}`,
        })}>
        단원 추가
      </Link>
    </article>
  );
};

export default CourseActionsBar;
