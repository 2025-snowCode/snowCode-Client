import {useContext, useState} from 'react';
import EllipsisIcon from '@/assets/svg/ellipsisIcon.svg?react';
import {formateCourseTermWithSlash} from '@/utils/course';
import {UserTypeContext} from '@/App';
import type {DashboardCourse} from '@/models/course';
import {Link} from 'react-router-dom';

const CourseCard = (course: DashboardCourse) => {
  const userType = useContext(UserTypeContext);
  const {
    year,
    semester,
    section,
    title,
    description,
    unitCount,
    assignmentCount,
  } = course;

  return (
    <Link to={`courses/${course.id}`}>
      <li className='w-148 flex items-stretch bg-white rounded-3xl shadow-card cursor-pointer'>
        {/* 좌측: 강의 기본 정보 */}
        <div className='flex flex-col gap-1.5 pl-8 pr-6.5 py-5.5'>
          <p className='text-sm font-light text-light-black'>
            {formateCourseTermWithSlash(year, semester, section)}
          </p>
          <h3 className='text-[22px]'>{title}</h3>
          <p className='text-base font-light text-secondary-black line-clamp-3'>
            {description}
          </p>
        </div>

        {/* 우측: 단원 수, 문제 수 */}
        <div className='relative bg-[#F9F9F9] flex-center px-7.5 py-6 rounded-r-3xl text-center text-base font-normal whitespace-nowrap'>
          <div className='pr-4 border-r-[0.5px] border-[#7A768C]'>
            <p>단원 수</p>
            <p className='font-medium'>{unitCount}개</p>
          </div>
          <div className='pl-4 border-l-[0.5px] border-[#7A768C]'>
            <p>문제 수</p>
            <p className='font-medium'>{assignmentCount}개</p>
          </div>

          {/* 관리자용 강의 관리 버튼 */}
          {userType === 'admin' && <CourseManageButton />}
        </div>
      </li>
    </Link>
  );
};

const CourseManageButton = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <>
      <button
        className='cursor-pointer absolute right-5.5 top-6.5 p-2'
        onClick={toggleMenu}>
        <EllipsisIcon className='w-[21.2px] h-[5px]' />
      </button>

      {menuVisible && <></>}
    </>
  );
};

export default CourseCard;
