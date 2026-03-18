import snowCodeLogo from '@/assets/images/snowCode_logo.svg';
import MenuIcon from '@/assets/svg/menuIcon.svg?react';
import {useCallback, useRef, useState} from 'react';
import SideBarItem from './AssignmentSideBarItem';
import EllipsisIcon from '@/assets/svg/ellipsisIcon.svg?react';
import {useParams} from 'react-router-dom';
import LockedIcon from '@/assets/svg/lock.svg?react';
import {formatDateMonthDay} from '@/shared/lib/course';
import {useClickOutside} from '@/shared/lib';
import type {TUnit} from '@/entities/unit/model/schemas';

interface AssignmentSideBarProps {
  units: TUnit[];
}

const AssignmentSideBar = ({units}: AssignmentSideBarProps) => {
  const {assignmentId} = useParams();
  const sideBarRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const onToggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const onCloseSideBar = useCallback(() => {
    if (isOpen) setIsOpen(false);
  }, [isOpen]);

  useClickOutside({ref: sideBarRef, onClickOutside: onCloseSideBar});

  const sideBarBorderClass = isOpen ? 'border-r border-purple-stroke' : '';

  return (
    <>
      <aside
        ref={sideBarRef}
        className={`${isOpen ? 'w-120 overflow-y-auto' : 'w-26 overflow-hidden'} transition-[width] duration-150 ease-in-out flex flex-col fixed top-0 left-0 z-30 bg-white h-full shadow-box`}>
        {/* 로고 및 토글 버튼 영역 */}
        <div
          className={`w-26 flex flex-col items-center pt-10 ${sideBarBorderClass}`}>
          <img
            src={snowCodeLogo}
            alt='SnowCode Logo'
            className='w-15.5 h-10 mb-10'
          />
          <button
            onClick={onToggleSidebar}
            className={`${isOpen ? 'bg-purple-stroke' : 'bg-white'} cursor-pointer w-11 h-11 flex-center rounded-full drop-shadow-[0_0_8px_rgba(0,0,0,0.10)]`}>
            <MenuIcon className='w-4.5 h-4' />
          </button>
        </div>

        {/* 네비게이션 */}
        <nav className=''>
          {units.map((unit) => (
            <div key={unit.id}>
              <div
                className={`flex items-end h-9 ${!unit.isOpen ? 'opacity-60' : ''}`}>
                <div className={`w-26 h-full shrink-0 ${sideBarBorderClass}`} />
                {isOpen && (
                  <div className='flex-1 pl-7.5 flex items-center gap-2'>
                    <h3 className='text-base text-light-black'>{unit.title}</h3>

                    {!unit.isOpen && (
                      <>
                        <LockedIcon className='w-3 h-3.5 text-light-black' />
                        <span className='ml-auto pr-5.5 text-light-black text-sm'>
                          {formatDateMonthDay(unit.releaseDate)} ~
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {unit.assignments.map((assignment, index) => (
                <SideBarItem
                  key={assignment.id}
                  index={index + 1}
                  isOpen={isOpen}
                  isFirst={index === 0}
                  isLast={index === unit.assignmentCount - 1}
                  isActive={Number(assignmentId) === assignment.id}
                  isLocked={!unit.isOpen}
                  {...assignment}
                />
              ))}
            </div>
          ))}
        </nav>

        <div className={`flex-1 w-26 ${sideBarBorderClass}`} />

        <div className='sticky bottom-0 bg-white'>
          <button
            onClick={onToggleSidebar}
            className={`cursor-pointer w-26 h-full pt-3 pb-6 flex-center ${sideBarBorderClass}`}>
            <EllipsisIcon className='w-8.25 h-1.75 text-primary' />
          </button>
        </div>
      </aside>

      <div
        className={`overlay fixed inset-0 z-20 bg-black/45 transition-opacity duration-150 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
    </>
  );
};

export default AssignmentSideBar;
