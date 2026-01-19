import {useContext, useState} from 'react';
// import EllipsisIcon from '@/assets/svg/ellipsisIcon.svg?react';
import {formateCourseTermWithSlash} from '@/utils/course';
import {UserTypeContext} from '@/App';
import type {DashboardCourse} from '@/models/course';

const CourseCard = (course: DashboardCourse) => {
  // const [menuVisible, setMenuVisible] = useState(false);

  // const toggleMenu = () => {
  //   setMenuVisible(!menuVisible);
  // };

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
    <li className='w-148 flex items-stretch bg-white rounded-3xl shadow-card'>
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
      <div className='bg-[#F9F9F9] flex-center px-7.5 py-6 rounded-r-3xl text-center text-base font-normal whitespace-nowrap'>
        <div className='pr-4 border-r-[0.5px] border-[#7A768C]'>
          <p>단원 수</p>
          <p className='font-medium'>{unitCount}개</p>
        </div>
        <div className='pl-4 border-l-[0.5px] border-[#7A768C]'>
          <p>문제 수</p>
          <p className='font-medium'>{assignmentCount}개</p>
        </div>
      </div>
    </li>
  );
};

export default CourseCard;

// return (
//   <div className='min-h-36 rounded-3xl bg-gray border-0 flex-center my-4 shadow-card'>
//     <section className='p-8 bg-white rounded-tl-3xl rounded-bl-3xl'>
//       <p className='text-sm font-light text-light-black'>
//         {`${year}\\${formatSemester(semester)}학기\\${section}분반`}
//       </p>
//       <h3 className='text-[22px]'>{title}</h3>
//       <p className='text-base font-light text-secondary-black'>
//         {description}
//       </p>
//     </section>
//     <section className='relative'>
//       {userType === 'admin' && (
//         <button
//           className='absolute right-8 cursor-pointer'
//           onClick={toggleMenu}>
//           <EllipsisIcon width={21.2} height={5} />
//         </button>
//       )}
//       {menuVisible && (
//         <ul
//           className='bg-white w-[146.1px] flex flex-col border-0 absolute top-3 right-2 rounded-[9px] shadow-modal cursor-pointer'
//           onMouseLeave={toggleMenu}>
//           <li className='border-b-1 border-stroke px-4 py-3 hover:bg-stroke rounded-t-[9px]'>
//             수정하기
//           </li>
//           <li className='px-4 py-3 hover:bg-stroke rounded-b-[9px]'>
//             삭제하기
//           </li>
//         </ul>
//       )}

//       <div className='flex-center p-4'>
//         <div className='flex-center flex-col whitespace-nowrap border-r border-[#7A768C] px-4'>
//           <div>단원 수</div>
//           <div>{`${unitCount}개`}</div>
//         </div>
//         <div className='flex-center flex-col whitespace-nowrap px-4'>
//           <div>문제 수</div>
//           <div>{`${assignmentCount}개`}</div>
//         </div>
//       </div>
//     </section>
//   </div>
// );
