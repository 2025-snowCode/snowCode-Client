import CourseList from '../../components/common/Dashboard/CourseList';
import ScheduleList from '../../components/common/Dashboard/ScheduleList';

const Dashboard = () => {
  return (
    <div className='w-full'>
      <h1 className='text-[28px] px-1 pb-4 font-medium'>내 대시보드</h1>
      <div className='flex justify-between'>
        <CourseList />
        <ScheduleList />
      </div>
    </div>
  );
};

export default Dashboard;
