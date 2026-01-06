import CourseContent from '@/components/common/CourseOverview/CourseContent';
import CourseHero from '@/components/common/CourseOverview/CourseHero';
import {courseResponse} from '@/components/common/CourseOverview/dummy/response';
import EmptyCourse from '@/components/common/CourseOverview/EmptyCourse';

function countAssignments() {
  let assignmentCount = 0;
  courseResponse.response.units.forEach(
    (unit) => (assignmentCount += unit.assignmentCount)
  );

  return assignmentCount;
}

const isActiveCourse = courseResponse.response.unitCount !== 0;

const CourseOverviewPage = () => {
  return (
    <div className='p-4 w-full min-h-screen flex flex-col absolute top-0 left-0 z-0'>
      <CourseHero
        title={courseResponse.response.title}
        year={courseResponse.response.year}
        semester={courseResponse.response.semester}
        section={courseResponse.response.section}
        unitCount={courseResponse.response.unitCount}
        assignmentCount={countAssignments()}
        studentCount={courseResponse.response.studentCount}
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
