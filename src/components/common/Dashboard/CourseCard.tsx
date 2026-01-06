import {useState} from 'react';
import EllipsisIcon from '/svg/ellipsisIcon.svg?react';
import type {Course, UserType} from './types';
import {getSemesterLabel} from '@/utils/getSemesterLabel';

interface CourseCardProps extends Course {
  userType: UserType;
}

const CourseCard = ({
  semester,
  year,
  section,
  title,
  description,
  unitCount,
  assignmentCount,
  userType,
}: CourseCardProps) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className='min-h-36 rounded-3xl bg-gray border-0 flex-center my-4 shadow-card'>
      <section className='p-8 bg-white rounded-tl-3xl rounded-bl-3xl'>
        <p className='text-sm font-light text-light-black'>
          {`${year}\\${getSemesterLabel(semester)}학기\\${section}분반`}
        </p>
        <h3 className='text-[22px]'>{title}</h3>
        <p className='text-base font-light text-secondary-black'>
          {description}
        </p>
      </section>
      <section className='relative'>
        {userType === 'admin' && (
          <button
            className='absolute right-8 cursor-pointer'
            onClick={toggleMenu}>
            <EllipsisIcon width={21.2} height={5} />
          </button>
        )}
        {menuVisible && (
          <ul
            className='bg-white w-[146.1px] flex flex-col border-0 absolute top-3 right-2 rounded-[9px] shadow-modal cursor-pointer'
            onMouseLeave={toggleMenu}>
            <li className='border-b-1 border-stroke px-4 py-3 hover:bg-stroke rounded-t-[9px]'>
              수정하기
            </li>
            <li className='px-4 py-3 hover:bg-stroke rounded-b-[9px]'>
              삭제하기
            </li>
          </ul>
        )}

        <div className='flex-center p-4'>
          <div className='flex-center flex-col whitespace-nowrap border-r border-[#7A768C] px-4'>
            <div>단원 수</div>
            <div>{`${unitCount}개`}</div>
          </div>
          <div className='flex-center flex-col whitespace-nowrap px-4'>
            <div>문제 수</div>
            <div>{`${assignmentCount}개`}</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseCard;
