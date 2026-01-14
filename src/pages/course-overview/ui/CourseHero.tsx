import snowcodeOverviewMini from '@/assets/images/snowcode_overview_mini.svg';
import {useLocation} from 'react-router-dom';
import type {CourseOverview} from '@/models/course';
import {formatSemester} from '@/utils/course';
import Button from '@/components/common/Button';

interface CourseHeroProps {
  courseData: Omit<CourseOverview, 'units'>;
  assignmentCount: number;
  isActiveCourse: boolean;
}

export const CourseHero = ({
  courseData,
  assignmentCount,
  isActiveCourse,
}: CourseHeroProps) => {
  const pathname = useLocation().pathname;
  const isAdmin = pathname.startsWith('/admin');

  const {title, year, semester, section, unitCount, studentCount} = courseData;

  return (
    <section className='w-full flex-center flex-col pt-38.5 pb-12.5 rounded-t-[30px] bg-radial-gradient'>
      {isAdmin && isActiveCourse && (
        <nav className='pl-190 absolute top-36 right-26'>
          <CourseActionsBar />
        </nav>
      )}

      <CourseInfo
        title={title}
        year={year}
        semester={semester}
        section={section}
      />

      {isActiveCourse && (
        <CourseStats
          unitCount={unitCount}
          assignmentCount={assignmentCount}
          studentCount={studentCount}
          isAdmin={isAdmin}
        />
      )}
    </section>
  );
};

const CourseInfo = ({title, year, semester, section}: any) => {
  const courseInfo = `${year}년 ${formatSemester(semester)} ${section}분반`;

  return (
    <article className='flex-center flex-col text-white'>
      <img src={snowcodeOverviewMini} alt='logo' />
      <h1 className='pb-[1px] text-2xl font-medium leading-9'>{title}</h1>
      <p className='pb-[11px] text-base font-normal leading-6'>{courseInfo}</p>
    </article>
  );
};

const CourseStats = ({
  unitCount,
  assignmentCount,
  studentCount,
  isAdmin,
}: any) => {
  const studentInfo = isAdmin && studentCount ? ` | ${studentCount}명` : '';
  const courseStats = `${unitCount}단원 | ${assignmentCount}문제${studentInfo}`;

  return (
    <article className='px-3.5 py-1.5 text-center bg-white rounded-[35px]'>
      <span className='text-base font-normal'>{courseStats}</span>
    </article>
  );
};

const CourseActionsBar = () => {
  return (
    <article className='flex gap-5'>
      <Button color='outlineWhite'>학생 목록</Button>
      <Button color='outlinePurple'>단원 추가</Button>
    </article>
  );
};

export default CourseHero;
