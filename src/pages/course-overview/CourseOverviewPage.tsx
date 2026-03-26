import {getTotalAssignmentCount} from '@/shared/lib/course';
import CourseContent from '@/pages/course-overview/ui/CourseContent';
import CourseHero from '@/pages/course-overview/ui/CourseHero';
import {useParams} from 'react-router-dom';
import {useSuspenseQuery} from '@tanstack/react-query';
import {courseQueries} from '@/entities/course/api/courseQueries';

const CourseOverviewPage = () => {
  const {courseId: id} = useParams();
  const courseId = Number(id);
  const {data: course} = useSuspenseQuery(
    courseQueries.getCourseDetails(courseId)
  );
  const totalAssignmentCount = getTotalAssignmentCount(course.units); // 총 문제 수 계산
  const hasUnits = course.unitCount !== 0 ? true : false;

  return (
    <div className='w-full min-h-screen flex flex-col absolute top-0 left-0 z-0 p-4'>
      <CourseHero
        course={course}
        assignmentCount={totalAssignmentCount}
        isActiveCourse={hasUnits}
        firstUnitId={course.units[0]?.id}
      />
      <CourseContent
        units={course.units}
        isActiveCourse={hasUnits}
        courseId={courseId}
      />
    </div>
  );
};

export default CourseOverviewPage;
