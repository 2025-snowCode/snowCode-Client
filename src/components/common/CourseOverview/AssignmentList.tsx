import type {Assignment} from '../../admin/assignments/dummy/types';
import AssignmentItem from './AssignmentItem';

interface AssignmentListProps {
  isOpen?: boolean;
  assignments: Assignment[];
}

const AssignmentList = ({isOpen, assignments}: AssignmentListProps) => {
  return (
    <div className='flex flex-col'>
      {assignments.map((assignment, index) => (
        <AssignmentItem
          key={assignment.id}
          id={assignment.id}
          title={assignment.title}
          index={index + 1}
          isOpen={isOpen}
          submittedStatus={assignment.submittedStatus}
        />
      ))}
    </div>
  );
};

export default AssignmentList;
