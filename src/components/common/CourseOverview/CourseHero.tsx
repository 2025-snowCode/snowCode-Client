import {useLocation} from 'react-router-dom';
import snowcodeOverviewMini from '@/assets/images/snowcode_overview_mini.svg';
import {getSemesterLabel} from '@/utils/getSemesterLabel';
import type {SemesterCode} from '@/components/admin/assignments/dummy/types';
import CourseActionsBar from './CourseActionsBar';
import CourseStat from './CourseStat';

interface CoursHeroProps {
  title: string;
  year: number;
  semester: SemesterCode;
  section: string;
  unitCount: number;
  assignmentCount: number;
  studentCount?: number;
  isActiveCourse: boolean;
}

const CourseHero = ({
  title,
  year,
  semester,
  section,
  unitCount,
  assignmentCount,
  studentCount,
  isActiveCourse,
}: CoursHeroProps) => {
  const pathname = useLocation().pathname;
  const isAdmin = pathname.startsWith('/admin');

  return (
    <div className='w-full h-[353px] flex-center flex-col rounded-t-[30px] bg-radial-[80%_74%_at_34%_0%] from-[#AC9BFF] from-0% to-[#7D63FF] to-100%'>
      {isAdmin && isActiveCourse && (
        <div className='pl-190 absolute top-36 right-26'>
          <CourseActionsBar
            isActive={isActiveCourse}
            title={title}
            section={section}
          />
        </div>
      )}
      <img className='pt-22 pb-[4px]' src={snowcodeOverviewMini} alt='logo' />
      <span className='pb-[1px] text-2xl text-white font-medium leading-9'>
        {title}
      </span>
      <span className='pb-[11px] text-base text-white font-normal leading-6'>{`${year}년 ${getSemesterLabel(
        semester
      )}학기 ${section}분반`}</span>
      {isActiveCourse && (
        <CourseStat
          unitCount={unitCount}
          assignmentCount={assignmentCount}
          studentCount={studentCount}
        />
      )}
    </div>
  );
};

export default CourseHero;
