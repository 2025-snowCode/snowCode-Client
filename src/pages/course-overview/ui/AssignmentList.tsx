import Badge from '@/shared/ui/Badge';
import {Link} from 'react-router-dom';
import type {Assignment} from '@/entities/assignment/model/types';

interface AssignmentListProps {
  isOpen?: boolean;
  assignments: Assignment[];
}

interface AssignmentItemProps extends Assignment {
  index: number;
  isOpen?: boolean;
}

// 문제 목록
const AssignmentList = ({isOpen, assignments}: AssignmentListProps) => {
  return (
    <ul className='flex flex-col divide-y divide-[#EEEBFC]'>
      {assignments.map((assignment, index) => (
        <AssignmentItem
          key={assignment.id}
          index={index + 1}
          isOpen={isOpen}
          {...assignment}
        />
      ))}
    </ul>
  );
};

// 개별 문제 항목
const AssignmentItem = ({
  title,
  index,
  submittedStatus,
  isOpen,
}: AssignmentItemProps) => {
  const isLocked = isOpen === false ? 'opacity-60 pointer-events-none' : '';

  return (
    <li className={`w-full p-4 ${isLocked}`}>
      {/* 좌측: 인덱스, 문제명 */}
      <div className='max-w-185 mx-auto flex items-center justify-between'>
        <div className='flex items-center gap-7.5 flex-1'>
          <span className='w-7.5 h-7.5 shrink-0 flex-center rounded-full border border-purple-stroke text-base text-light-black font-medium'>
            {index}
          </span>

          {isOpen ? (
            <Link to={`/assignments/${index}`} className='min-w-0'>
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

        {/* 우측: 제출현황 배지 */}
        {isOpen && (
          <div className='shrink-0 ml-2'>
            <Badge
              variant='submission'
              status={submittedStatus || 'NOT_SUBMITTED'}
            />
          </div>
        )}
      </div>
    </li>
  );
};

export default AssignmentList;
