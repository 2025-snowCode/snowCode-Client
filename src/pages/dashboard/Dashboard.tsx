import logo from '@/assets/images/snowCode_logo_mini.svg';
import CourseList from './ui/CourseList';
import {responseCourseList} from './models/ResponseCourseList';
import Button from '@/components/common/Button';
import AddIcon from '@/assets/svg/addIcon.svg?react';
import {useContext} from 'react';
import {UserTypeContext} from '@/App';
import ScheduleList from './ui/ScheduleList';

const Dashboard = () => {
  const courseListData = responseCourseList.response.courses;
  const userType = useContext(UserTypeContext);

  return (
    <main className='w-full'>
      <h1 className='font-semibold text-[28px]/normal mb-7'>내 대시보드</h1>
      <div className='grid grid-cols-2 gap-43'>
        {/* 강의 목록 */}
        <section>
          <div className='flex items-center justify-between'>
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

// 섹션 헤더 컴포넌트
const SectionHeader = ({title}: {title: string}) => {
  return (
    <header className='flex items-center gap-2 mb-5'>
      <img src={logo} alt='' />
      <h2 className='text-xl/normal font-medium'>{title}</h2>
    </header>
  );
};

// 추가 버튼 컴포넌트
const AddButton = () => {
  return (
    <Button
      color='ghostWhite'
      size='compact'
      content='mixed'
      className='hover:opacity-70'>
      <AddIcon className='w-3 h-3' />
      추가
    </Button>
  );
};

export default Dashboard;
