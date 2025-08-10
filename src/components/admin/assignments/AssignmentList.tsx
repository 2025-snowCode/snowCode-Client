import type {Course} from './dummy/types';
import AssignmentCard from './AssignmentCard';

interface AssignmentListProps {
  courses: Course[];
  selectMode: boolean;
  onLinkAssignments?: (id: number, title: string, isSelected: boolean) => void;
}

const AssignmentList = ({
  courses,
  selectMode,
  onLinkAssignments,
}: AssignmentListProps) => {
  // 문제 수 세기
  const countAssignments = () => {
    let count = 0;
    courses.forEach((course) => {
      count += course.assignments.length;
    });

    return count;
  };

  return (
    <div className='mt-10 mb-[11px]'>
      <p className='mb-3 font-medium text-lg'>{countAssignments()}문제</p>
      <div className='flex flex-col'>
        {courses.map((course) =>
          course.assignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              selectMode={selectMode}
              onLinkAssignments={onLinkAssignments}
              {...assignment}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AssignmentList;
