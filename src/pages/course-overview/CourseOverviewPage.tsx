import {getTotalAssignmentCount} from '@/shared/lib/course';
import CourseContent from './ui/CourseContent';
import CourseHero from './ui/CourseHero';
import {courseResponse} from '@/shared/mocks/courseOverviewResponse';

const CourseOverviewPage = () => {
  const courseData = courseResponse.response;
  const totalAssignmentCount = getTotalAssignmentCount(courseData.units); // 총 문제 수 계산
  const hasUnits = courseData.unitCount !== 0 ? true : false;

  return (
    <div className='w-full min-h-screen flex flex-col absolute top-0 left-0 z-0 p-4'>
      <CourseHero
        courseData={courseData}
        assignmentCount={totalAssignmentCount}
        isActiveCourse={hasUnits}
      />
      <CourseContent units={courseData.units} isActiveCourse={hasUnits} />
    </div>
  );
};

export default CourseOverviewPage;
