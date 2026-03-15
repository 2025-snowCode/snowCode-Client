import snowCodeLogo from '@/assets/images/snowCode_logo.svg';
import MenuIcon from '@/assets/svg/menuIcon.svg?react';
import {useCallback, useRef, useState} from 'react';
import SideBarItem from './AssignmentSideBarItem';
import EllipsisIcon from '@/assets/svg/ellipsisIcon.svg?react';
import {useParams} from 'react-router-dom';
import LockedIcon from '@/assets/svg/lock.svg?react';
import {formatDateMonthDay} from '@/shared/lib/course';
import {mockSideBarCourse} from '../mock';
import {useClickOutside} from '@/shared/lib';

const AssignmentProgressSideBar = () => {
  const {assignmentId} = useParams();
  const sideBarRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const units = mockSideBarCourse.response.units;
  const sideBarBorderClass = isOpen ? 'border-r border-purple-stroke' : '';

  const onCloseSideBar = useCallback(() => {
    if (isOpen) setIsOpen(false);
  }, [isOpen]);

  useClickOutside({ref: sideBarRef, onClickOutside: onCloseSideBar});

  const onToggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <aside
        ref={sideBarRef}
        className={`${isOpen ? 'w-120 overflow-y-auto' : 'w-26 overflow-hidden'} transition-[width] duration-150 ease-in-out flex flex-col fixed top-0 left-0 z-26 bg-white h-full shadow-box`}>
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
        <nav className='flex-1'>
          {units.map((unit) => (
            <div key={unit.id}>
              {/* 단원 제목 영역 */}
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

              {/* 과제 아이템 영역 */}
              {unit.assignments.map((assignment, index) => (
                <SideBarItem
                  key={assignment.id}
                  index={index}
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

        <div className={`sticky bottom-0 h-10 bg-white`}>
          <button
            onClick={onToggleSidebar}
            className={`w-26 h-10 flex-center ${sideBarBorderClass}`}>
            <EllipsisIcon className='cursor-pointer w-8.25 h-1.75 text-primary' />
          </button>
          <div className='flex-1' />
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

export default AssignmentProgressSideBar;
