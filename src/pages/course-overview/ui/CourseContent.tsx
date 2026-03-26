import snowCodeOverview from '@/assets/images/snowcode_overview.svg';
import UnitItem from '@/pages/course-overview/ui/UnitItem';
import CourseActionsBar from '@/pages/course-overview/ui/CourseActionsBar';
import {useUserStore} from '@/entities/auth/model/useUserStore';
import type {TCourseOverview} from '@/entities/course/model/schemas';

interface CourseContentProps {
  units: TCourseOverview['units'];
  isActiveCourse: boolean;
  courseId: number;
}

const CourseContent = ({
  courseId,
  units,
  isActiveCourse,
}: CourseContentProps) => {
  // 빈 강의
  if (isActiveCourse === false) {
    return <EmptyCourse courseId={courseId} />;
  }

  return (
    <section className='bg-white w-full flex-1 rounded-b-[30px]'>
      {units.map((unit, index) => (
        <UnitItem key={unit.id} index={index} courseId={courseId} {...unit} />
      ))}
    </section>
  );
};

const EmptyCourse = ({courseId}: {courseId: number}) => {
  const userType = useUserStore((state) => state.userType);

  return (
    <section className='flex-1 flex-center flex-col bg-white w-full rounded-b-[30px]'>
      <img
        className='-mt-5.5 mb-3 w-40 h-40'
        src={snowCodeOverview}
        alt='snowCode 이미지'
      />
      <p className='mb text-base leading-7 font-normal'>비어있는 강의</p>
      <p className='mb-5 text-xl leading-9 font-medium'>
        아직 생성된 단원이 없어요
      </p>
      {/* 강의 관리 버튼은 관리자 전용 */}
      {userType === 'admin' && (
        <CourseActionsBar isActiveCourse={false} courseId={courseId} />
      )}
    </section>
  );
};

export default CourseContent;
