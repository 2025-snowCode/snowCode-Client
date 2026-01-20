import snowCodeOverview from '@/assets/images/snowcode_overview.svg';
import UnitItem from './UnitItem';
import CourseActionsBar from './CourseActionsBar';
import {useUserStore} from '@/entities/user/model/user.store';
import type {CourseContentProps} from '../models/types';

const CourseContent = ({units, isActiveCourse}: CourseContentProps) => {
  // 빈 강의
  if (isActiveCourse === false) {
    return <EmptyCourse />;
  }

  return (
    <section className='bg-white w-full flex-1 rounded-b-[30px]'>
      {units.map((unit, index) => (
        <UnitItem key={unit.id} index={index} {...unit} />
      ))}
    </section>
  );
};

const EmptyCourse = () => {
  const userType = useUserStore((state) => state.userType); // 유저 타입 확인

  return (
    <section className='flex-1 flex-center flex-col bg-white w-full pt-30 pb-41 rounded-b-[30px]'>
      <img className='mb-11' src={snowCodeOverview} alt='snowCode 이미지' />
      <p className='mb-1.5 text-lg leading-7 font-normal'>비어있는 강의</p>
      <p className='mb-7 text-2xl leading-9 font-medium'>
        아직 생성된 단원이 없어요
      </p>
      {/* 강의 관리 버튼은 관리자 전용 */}
      {userType === 'admin' && <CourseActionsBar isActiveCourse={false} />}
    </section>
  );
};
export default CourseContent;
