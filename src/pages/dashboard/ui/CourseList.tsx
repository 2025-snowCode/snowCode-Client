import type {CourseListProps} from '../models/types';
import CourseCard from './CourseCard';

// 강의 목록
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
