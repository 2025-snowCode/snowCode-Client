import CourseContent from './ui/CourseContent';
import CourseHero from './ui/CourseHero';
import {courseResponse} from '@/pages/course-overview/models/response';
import EmptyCourse from './ui/EmptyCourse';

function countAssignments() {
  let assignmentCount = 0;
  courseResponse.response.units.forEach(
    (unit) => (assignmentCount += unit.assignmentCount)
  );

  return assignmentCount;
}

const courseData = courseResponse.response;
const isActiveCourse = courseData.unitCount > 0;

const CourseOverviewPage = () => {
  return (
    <div className='p-4 w-full min-h-screen flex flex-col absolute top-0 left-0 z-0'>
      <CourseHero
        courseData={courseData}
        assignmentCount={countAssignments()}
        isActiveCourse={isActiveCourse}
      />
      {isActiveCourse ? (
        <CourseContent units={courseResponse.response.units} />
      ) : (
        <EmptyCourse />
      )}
    </div>
  );
};

export default CourseOverviewPage;
