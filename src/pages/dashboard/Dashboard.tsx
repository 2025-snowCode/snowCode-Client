import LogoIcon from '@/assets/images/snowCode_logo.svg?react';
import CourseList from '@/pages/dashboard/ui/CourseList';
import Button from '@/shared/ui/button/Button';
import AddIcon from '@/assets/svg/addIcon.svg?react';
import ScheduleList from '@/pages/dashboard/ui/ScheduleList';
import {Link} from 'react-router-dom';
import {useUserStore} from '@/entities/auth/model/useUserStore';
import {
  useSuspenseQueries,
} from '@tanstack/react-query';
import {EmptyState} from '@/shared/ui/EmptyState';
import {courseQueries} from '@/entities/course/api/courseQueries';
import {assignmentQueries} from '@/entities/assignment/api/assignmentQueries';

const Dashboard = () => {
  const userType = useUserStore((state) => state.userType);

  // 강의 및 스케쥴 데이터 패칭
  const [
    {
      data: {courseCount, courses},
    },
    {
      data: {scheduleCount, schedules},
    },
  ] = useSuspenseQueries({
    queries: [
      courseQueries.getAllCourses(),
      assignmentQueries.getAssignmentSchedules(),
    ],
  });


  return (
    <main className='w-full'>
      <h1 className='font-semibold text-[28px]/normal mb-7'>내 대시보드</h1>
      <div className='flex items-start gap-16'>
        {/* 강의 목록 */}
        <section>
          <div className='flex items-start justify-between'>
            <SectionHeader title='강의 목록' />
            {userType === 'admin' && <AddButton />}
          </div>

          {courseCount === 0 ? (
            <EmptyState>등록된 강의가 없습니다.</EmptyState>
          ) : (
            <CourseList courseList={courses} />
          )}
        </section>

        {/* 스케쥴 목록 */}
        <section>
          <div className='pl-24.5'>
            <SectionHeader title='내 스케쥴' />
          </div>

          {scheduleCount === 0 ? (
            <EmptyState className='pl-24.5'>
              마감 예정인 과제가 없습니다.
            </EmptyState>
          ) : (
            <ScheduleList scheduleList={schedules} />
          )}
        </section>
      </div>
    </main>
  );
};

const SectionHeader = ({title}: {title: string}) => {
  return (
    <header className='flex items-center gap-2 mb-5'>
      <LogoIcon className='w-8 h-5 shrink-0' />
      <h2 className='text-xl/normal font-medium'>{title}</h2>
    </header>
  );
};

const AddButton = () => {
  return (
    <Link to='courses/create'>
      <Button
        color='ghostWhite'
        size='compact'
        content='mixed'
        className='hover:opacity-70'>
        <AddIcon className='w-3 h-3' />
        추가
      </Button>
    </Link>
  );
};

export default Dashboard;
