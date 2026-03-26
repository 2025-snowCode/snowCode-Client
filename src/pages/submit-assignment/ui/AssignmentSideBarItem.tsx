import StatusCircle from './circle/StatusCircle';
import {useEffect, useRef} from 'react';
import {useLocation, Link, useParams} from 'react-router-dom';
import type {TAssignment} from '@/entities/assignment/model/schemas';
import IndexCircle from './circle/IndexCircle';
import {ROUTES} from '@/shared/config/routes';
import type {SubmissionStatus} from '@/shared/model/types';
import {twMerge} from 'tailwind-merge';

interface SideBarItemProps extends TAssignment {
  index: number;
  isOpen: boolean;
  isLast: boolean;
  isFirst: boolean;
  isActive: boolean;
  isLocked: boolean;
}

const SideBarItemHoverClass = {
  NOT_SUBMITTED: {base: 'bg-primary/5', hover: 'hover:bg-primary/5'},
  CORRECT: {base: 'bg-primary/5', hover: 'hover:bg-primary/5'},
  INCORRECT: {base: 'bg-badge-red/5', hover: 'hover:bg-badge-red/5'},
} satisfies Record<SubmissionStatus, {base: string; hover: string}>;

const SideBarItem = ({
  id,
  index,
  isOpen,
  submittedStatus,
  title,
  isLast,
  isFirst,
  isActive,
  isLocked,
  codeId,
}: SideBarItemProps) => {
  const {courseId} = useParams();
  const {pathname} = useLocation();
  const activeItemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (isActive) {
      activeItemRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [isActive, isOpen]);

  const assignmentPath = pathname.startsWith('/admin')
    ? `${ROUTES.ADMIN.ASSIGNMENTS.SUBMIT(courseId!, id)}`
    : `${ROUTES.STUDENT.ASSIGNMENTS.SUBMIT(courseId!, id)}`;

  const sideBarBorderClass = isOpen ? 'border-r border-purple-stroke' : '';
  const status = submittedStatus ?? 'NOT_SUBMITTED';
  const {base, hover} = SideBarItemHoverClass[status];

  return (
    <Link
      to={assignmentPath}
      state={{index, codeId}}
      ref={activeItemRef}
      tabIndex={isLocked ? -1 : undefined}
      onClick={(e) => {
        if (isLocked) e.preventDefault();
      }}
      className={twMerge(
        'flex items-center cursor-pointer',
        isLocked && 'pointer-events-none opacity-60',
        isActive ? base : hover
      )}>
      <div
        className={`w-26 shrink-0 flex flex-col items-center ${sideBarBorderClass}`}>
        <div
          className={`w-px flex-1 min-h-1.5 ${isFirst ? '' : 'bg-purple-stroke'}`}
        />
        <StatusCircle variant={submittedStatus || 'NOT_SUBMITTED'} />
        <div
          className={`w-px flex-1 min-h-1.5 ${isLast ? '' : 'bg-purple-stroke'}`}
        />
      </div>

      {isOpen && (
        <div className='flex-1 h-7.75 flex items-center gap-2 pl-7.5'>
          <IndexCircle index={index} color='primary' className='w-5 h-5' />
          <span className='text-lg text-secondary-black font-medium truncate'>
            {title}
          </span>
        </div>
      )}
    </Link>
  );
};

export default SideBarItem;
