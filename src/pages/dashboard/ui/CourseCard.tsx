import {formatCourseTermWithSlash} from '@/shared/lib/course';
import CourseManagementDropdown from '@/pages/dashboard/ui/CourseManagementDropdown';
import {useLocation, useNavigate} from 'react-router-dom';
import {ROUTES} from '@/shared/config/routes';
import type {TDashboardCourse} from '@/entities/course/model/types';

type CourseCardProps = TDashboardCourse;

const CourseCard = ({...course}: CourseCardProps) => {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  const {
    id,
    year,
    semester,
    section,
    title,
    description,
    unitCount,
    assignmentCount,
  } = course;

  return (
    <li className='w-148 flex items-stretch bg-white rounded-3xl shadow-card *:first:hover:opacity-50'>
      {/* 좌측: 강의 기본 정보 */}
      <button
        onClick={() =>
          navigate(
            pathname.startsWith('/admin')
              ? ROUTES.ADMIN.COURSES.DETAIL(id)
              : ROUTES.STUDENT.COURSES.DETAIL(id)
          )
        }
        className='cursor-pointer flex-1 flex flex-col gap-1.5 pl-8 pr-6.5 py-5.5 text-left'>
        <p className='text-sm font-light text-light-black'>
          {formatCourseTermWithSlash(year, semester, section)}
        </p>
        <h3 className='text-[22px]'>{title}</h3>
        <p className='text-base font-light text-secondary-black line-clamp-3'>
          {description}
        </p>
      </button>

      {/* 우측: 단원 수, 문제 수 */}
      <div className=' bg-gray flex-center px-7.5 py-6 rounded-r-3xl text-center text-base font-normal whitespace-nowrap'>
        <div className='pr-4 border-r-[0.5px] border-[#7A768C]'>
          <p>단원 수</p>
          <p className='font-medium'>{unitCount}개</p>
        </div>
        <div className='relative pl-4 border-l-[0.5px] border-[#7A768C]'>
          {/* 우측 상단 옵션 */}
          {pathname.startsWith('/admin') && (
            <CourseManagementDropdown courseId={id} />
          )}

          <p>문제 수</p>
          <p className='font-medium'>{assignmentCount}개</p>
        </div>
      </div>
    </li>
  );
};

export default CourseCard;
