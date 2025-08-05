import type {Course} from './dummy/types';
import AssignmentCard from './AssignmentCard';

interface AssignmentListProps {
  courses: Course[];
}

const AssignmentList = ({courses}: AssignmentListProps) => {
  // 문제 수 세기
  const countAssignments = () => {
    let count = 0;
    courses.forEach((course) => {
      count += course.assignments.length;
    });

    return count;
  };

  return (
    <div>
      <p className='mb-3 mt-10 font-medium text-lg'>{countAssignments()}문제</p>
      <div className='flex flex-col'>
        {courses.map((course) =>
          course.assignments.map((assignment) => (
            <AssignmentCard key={assignment.id} {...assignment} />
          ))
        )}
      </div>
    </div>
  );
};

export default AssignmentList;
