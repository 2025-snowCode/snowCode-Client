import {useState} from 'react';
import type {Assignment} from '../../common/Dashboard/types';
const assignments: Assignment[] = [
  {
    id: 1,
    course: '소프트웨어의 이해',
    section: '005',
    assignment: '음수 구별하기',
  },
  {
    id: 2,
    course: '데이터 구조와 알고리즘',
    section: '001',
    assignment: '스택 (Stack) 구현하기',
  },
  {
    id: 3,
    course: '데이터 구조와 알고리즘',
    section: '001',
    assignment: '스택 (Stack) 구현하기',
  },
  {
    id: 4,
    course: '데이터 구조와 알고리즘',
    section: '001',
    assignment: '스택 (Stack) 구현하기',
  },
  {
    id: 5,
    course: '데이터 구조와 알고리즘',
    section: '001',
    assignment: '스택 (Stack) 구현하기',
  },
  {
    id: 6,
    course: '데이터 구조와 알고리즘',
    section: '001',
    assignment: '스택 (Stack) 구현하기',
  },
];

const CourseSelector = () => {
  const [open, setOpen] = useState(false);

  const handleOnClick = () => {
    setOpen(!open);
  };

  return (
    <div className='relative pt-7'>
      <div
        className='flex items-center w-81 h-[45px] border-1 rounded-[9px] border-stroke px-[14px]'
        onClick={handleOnClick}>
        <span className='text-light-black'>강의를 선택하세요</span>
      </div>
      {open && (
        <ul className='flex flex-col w-81 mt-2 bg-gray border-0 rounded-[9px] absolute shadow-dropdown'>
          {assignments.map((a, index) => (
            <li
              key={a.id}
              className={`border-stroke px-[15.5px] py-[13px] ${
                index !== assignments.length - 1 ? 'border-b-1' : ''
              }`}>
              {a.course} {a.section}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseSelector;
