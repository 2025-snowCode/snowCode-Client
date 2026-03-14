import type {SubmissionStatus} from '@/shared/model/types';
import StatusCircle from './StatusCircle';
import {useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';

interface SideBarItemProps {
  id: number;
  index: number;
  title: string;
  submittedStatus: SubmissionStatus | string;
  isOpen: boolean;
  isLast: boolean;
  isFirst: boolean;
  isActive: boolean;
  isLocked: boolean;
}

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
}: SideBarItemProps) => {
  const sideBarBorderClass = isOpen ? 'border-r border-purple-stroke' : '';
  const activeItemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (isActive) {
      activeItemRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [isActive, isOpen]);

  return (
    <Link
      to={`/admin/assignments/${id}`}
      ref={activeItemRef}
      className={`${isLocked ? 'pointer-events-none opacity-60' : ''} flex items-center cursor-pointer ${isActive ? 'bg-primary/5' : 'hover:bg-primary/5'}`}>
      {/* 과제 제출여부 표시 배지 */}
      <div
        className={`w-30 shrink-0 flex flex-col items-center ${sideBarBorderClass}`}>
        <div
          className={`w-px flex-1 min-h-1.5 ${isFirst ? '' : 'bg-purple-stroke'}`}
        />
        <StatusCircle
          color={submittedStatus === 'CORRECT' ? 'primary' : 'secondary'}
        />
        <div
          className={`w-px flex-1 min-h-1.5 ${isLast ? '' : 'bg-purple-stroke'}`}
        />
      </div>

      {/* 과제 인데스 + 제목 */}
      {isOpen && (
        <div className='flex-1 h-7.75 flex items-center gap-2 pl-7.5'>
          <div className='bg-primary flex-center shrink-0 w-5 h-5 rounded-full text-white text-base'>
            {index + 1}
          </div>
          <span className='text-lg text-secondary-black font-medium truncate'>
            {title}
          </span>
        </div>
      )}
    </Link>
  );
};

export default SideBarItem;
