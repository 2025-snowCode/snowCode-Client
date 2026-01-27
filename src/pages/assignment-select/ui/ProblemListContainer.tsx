import AssignmentCard from '@/components/admin/assignments/AssignmentCard';
import type {AssignmentSelectCourse} from '@/models/course';

const ProblemListContainer = ({
  courseList,
}: {
  courseList: AssignmentSelectCourse[];
}) => {
  return (
    <>
      <ul className='w-full flex flex-col pr-6 h-96 pb-5 overflow-y-auto'>
        {courseList.map((course) =>
          course.assignments.map((assignment) => (
            <AssignmentCard key={assignment.id} {...assignment} />
          ))
        )}
      </ul>
    </>
  );
};

export default ProblemListContainer;
