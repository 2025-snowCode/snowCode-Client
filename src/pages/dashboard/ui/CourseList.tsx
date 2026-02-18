import type {DashboardCourse} from '@/entities/course/model/types';
import CourseCard from './CourseCard';

interface CourseListProps {
  courseList: DashboardCourse[];
  onDelete: (courseId: number) => void;
}

const CourseList = ({courseList, onDelete}: CourseListProps) => {
  return (
    <>
      <ul className='flex flex-col gap-4'>
        {courseList.map((course) => (
          <CourseCard key={course.id} {...course} onDelete={onDelete} />
        ))}
      </ul>
    </>
  );
};

export default CourseList;
