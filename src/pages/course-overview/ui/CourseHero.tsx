import snowcodeOverviewMini from '@/assets/images/snowcode_overview_mini.svg';
import type {CourseOverview} from '@/models/course';
import {formatSemester} from '@/utils/course';
import CourseActionsBar from './CourseActionsBar';

// 강의 상세 페이지 - Hero 섹션
interface CourseHeroProps {
  courseData: Omit<CourseOverview, 'units'>;
  assignmentCount: number;
  isActiveCourse: boolean;
  isAdmin: boolean;
}

export const CourseHero = ({
  courseData,
  assignmentCount,
  isActiveCourse,
  isAdmin,
}: CourseHeroProps) => {
  const {title, year, semester, section, unitCount, studentCount} = courseData;

  return (
    <section className='relative w-full flex-center flex-col pt-38.5 pb-12.5 rounded-t-[30px] bg-radial-gradient'>
      {isAdmin && isActiveCourse && (
        <nav className='absolute top-36 right-35'>
          <CourseActionsBar isActiveCourse={true} />
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

// 강의 정보 표시
type CourseInfoProps = Pick<
  CourseHeroProps['courseData'],
  'title' | 'year' | 'semester' | 'section'
>;

const CourseInfo = ({title, year, semester, section}: CourseInfoProps) => {
  const courseInfo = `${year}년 ${formatSemester(semester)} ${section}분반`;

  return (
    <article className='flex-center flex-col text-white'>
      <img src={snowcodeOverviewMini} alt='snowCode logo' />
      <h1 className='pb-[1px] text-2xl font-medium leading-9'>{title}</h1>
      <p className='pb-[11px] text-base font-normal leading-6'>{courseInfo}</p>
    </article>
  );
};

// 강의 Stats 표시
interface CourseStatsProps
  extends Pick<CourseHeroProps['courseData'], 'unitCount' | 'studentCount'> {
  assignmentCount: CourseHeroProps['assignmentCount'];
  isAdmin: boolean;
}

const CourseStats = ({
  unitCount,
  assignmentCount,
  studentCount,
  isAdmin,
}: CourseStatsProps) => {
  const studentInfo =
    isAdmin && studentCount !== undefined ? ` | ${studentCount}명` : '';
  const courseStats = `${unitCount}단원 | ${assignmentCount}문제${studentInfo}`;

  return (
    <article className='px-3.5 py-1.5 text-center bg-white rounded-[35px]'>
      <span className='text-base font-normal'>{courseStats}</span>
    </article>
  );
};

export default CourseHero;
