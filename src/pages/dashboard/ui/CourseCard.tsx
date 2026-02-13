import {formatCourseTermWithSlash} from '@/utils/course';
import CourseManagementDropdown from './CourseManagementDropdown';
import {useNavigate} from 'react-router-dom';
import {useUserStore} from '@/entities/auth/model/useUserStore';
import type {CourseCardProps} from '../models/types';

const CourseCard = ({onDelete, ...course}: CourseCardProps) => {
  const navigate = useNavigate();
  const userType = useUserStore((state) => state.userType);

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
      <div
        onClick={() => navigate(`courses/${id}`)}
        className='cursor-pointer flex-1 flex flex-col gap-1.5 pl-8 pr-6.5 py-5.5'>
        <p className='text-sm font-light text-light-black'>
          {formatCourseTermWithSlash(year, semester, section)}
        </p>
        <h3 className='text-[22px]'>{title}</h3>
        <p className='text-base font-light text-secondary-black line-clamp-3'>
          {description}
        </p>
      </div>

      {/* 우측: 단원 수, 문제 수 */}
      <div className=' bg-gray flex-center px-7.5 py-6 rounded-r-3xl text-center text-base font-normal whitespace-nowrap'>
        <div className='pr-4 border-r-[0.5px] border-[#7A768C]'>
          <p>단원 수</p>
          <p className='font-medium'>{unitCount}개</p>
        </div>
        <div className='relative pl-4 border-l-[0.5px] border-[#7A768C]'>
          {/* 관리자용 강의 관리 버튼 */}
          {userType === 'admin' && (
            <CourseManagementDropdown courseId={id} onDelete={onDelete} />
          )}

          <p>문제 수</p>
          <p className='font-medium'>{assignmentCount}개</p>
        </div>
      </div>
    </li>
  );
};

export default CourseCard;
