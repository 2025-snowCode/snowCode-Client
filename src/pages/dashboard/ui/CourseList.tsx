import type {TDashboardCourse} from '@/entities/course/model/schemas';
import CourseCard from '@/pages/dashboard/ui/CourseCard';

interface CourseListProps {
  courseList: TDashboardCourse[];
}

const CourseList = ({courseList}: CourseListProps) => {
  return (
    <>
      <ul className='flex flex-col gap-4'>
        {courseList.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </ul>
    </>
  );
};

export default CourseList;
