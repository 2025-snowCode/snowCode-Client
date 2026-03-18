import Badge from '@/shared/ui/badge/Badge';
import {useLocation, Link} from 'react-router-dom';
import type {TAssignment} from '@/entities/assignment/model/schemas';
import {ROUTES} from '@/shared/config/routes';

interface AssignmentListProps {
  isOpen?: boolean;
  assignments: TAssignment[];
  courseId: number;
}

interface AssignmentItemProps extends TAssignment {
  id: number;
  index: number;
  isOpen?: boolean;
  courseId: number;
}

const AssignmentList = ({
  isOpen,
  assignments,
  courseId,
}: AssignmentListProps) => {
  return (
    <ul className='flex flex-col divide-y divide-[#EEEBFC]'>
      {assignments.map((assignment, index) => (
        <AssignmentItem
          key={assignment.id}
          index={index + 1}
          isOpen={isOpen}
          courseId={courseId}
          {...assignment}
        />
      ))}
    </ul>
  );
};

const AssignmentItem = ({
  id,
  title,
  index,
  submittedStatus,
  isOpen,
  courseId,
}: AssignmentItemProps) => {
  const {pathname} = useLocation();
  const isLocked = isOpen === false ? 'opacity-60 pointer-events-none' : '';
  const assignmentPath = pathname.startsWith('/admin')
    ? `${ROUTES.ADMIN.ASSIGNMENTS.SUBMIT(courseId!, id)}`
    : `${ROUTES.STUDENT.ASSIGNMENTS.SUBMIT(courseId!, id)}`;

  return (
    <li className={`w-full p-4 ${isLocked}`}>
      <div className='max-w-185 mx-auto flex items-center justify-between'>
        <div className='flex items-center gap-7.5 flex-1'>
          <span className='w-7.5 h-7.5 shrink-0 flex-center rounded-full border border-purple-stroke text-base text-light-black font-medium'>
            {index}
          </span>

          {isOpen ? (
            <Link to={assignmentPath} state={{index}} className='min-w-0'>
              <p className='truncate text-secondary-black text-base font-normal hover:text-primary hover:underline hover:underline-offset-4 cursor-pointer'>
                {title}
              </p>
            </Link>
          ) : (
            <p className='truncate text-secondary-black text-base font-normal'>
              {title}
            </p>
          )}
        </div>

        {isOpen && (
          <div className='shrink-0 ml-2'>
            <Badge
              variant='submission'
              status={submittedStatus ?? 'NOT_SUBMITTED'}
            />
          </div>
        )}
      </div>
    </li>
  );
};

export default AssignmentList;
