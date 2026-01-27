import AssignmentCard from '@/components/admin/assignments/AssignmentCard';
import type {AssignmentSelectCourse} from '@/models/course';
import {getTotalProblemCount} from '@/utils/course';

const ProblemListContainer = ({
  courseList,
}: {
  courseList: AssignmentSelectCourse[];
}) => {
  const totalProblemCount = getTotalProblemCount(courseList);

  return (
    <div>
      <h3 className='text-lg/[27px] font-medium mb-4'>
        {totalProblemCount}문제
      </h3>
      <ul className='w-full flex flex-col pr-6 h-96 pb-5 overflow-y-auto'>
        {courseList.map((course) =>
          course.assignments.map((assignment) => (
            <AssignmentCard key={assignment.id} {...assignment} />
          ))
        )}
      </ul>
    </div>
  );
};

export default ProblemListContainer;
