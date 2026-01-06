import snowCodeOverview from '../../../assets/images/snowcode_overview.svg';
import CourseActionsBar from './CourseActionsBar';

const EmptyCourse = () => {
  return (
    <div className='w-full py-25 bg-white flex-1 rounded-b-[30px] flex-center flex-col'>
      <img src={snowCodeOverview} alt='' />
      <span className='text-lg leading-7 font-normal pt-6 pb-1'>
        비어있는 강의
      </span>
      <span className='text-2xl leading-9 font-medium pb-7'>
        아직 생성된 단원이 없어요
      </span>
      <CourseActionsBar isActive={false} title='' section='' />
    </div>
  );
};

export default EmptyCourse;
