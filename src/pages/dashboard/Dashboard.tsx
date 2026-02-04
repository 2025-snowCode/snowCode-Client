import LogoIcon from '@/assets/images/snowCode_logo.svg?react';
import CourseList from './ui/CourseList';
import {responseCourseList} from './models/ResponseCourseList';
import Button from '@/components/common/Button';
import AddIcon from '@/assets/svg/addIcon.svg?react';
import ScheduleList from './ui/ScheduleList';
import {Link} from 'react-router-dom';
import {useUserStore} from '@/entities/auth/model/useUserStore';

const Dashboard = () => {
  const courseListData = responseCourseList.response.courses;
  const userType = useUserStore((state) => state.userType);

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
          <CourseList courseList={courseListData} />
        </section>

        {/* 스케쥴 목록 */}
        <section>
          <div className='pl-24.5'>
            <SectionHeader title='내 스케쥴' />
          </div>
          <ScheduleList />
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
