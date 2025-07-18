import CourseList from '../components/Dashboard/CourseList';
import ScheduleList from '../components/Dashboard/ScheduleList';

const Dashboard = () => {
  return (
    <div className='min-h-screen h-full py-10 bg-background flex-col'>
      <div className='w-289 mx-auto my-0'>
        <h1 className='text-[28px] pt-10 pb-4'>내 대시보드</h1>
        <div className='flex flex-row justify-between'>
          <CourseList />
          <ScheduleList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
