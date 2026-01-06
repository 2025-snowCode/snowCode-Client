import {useState} from 'react';
import ArrowdownIcon from '/svg/arrowdownIcon.svg?react';
import type {Course} from './dummy/types';

interface CourseSelectorProps {
  courses: Course[];
  onSelectCourse: (courseId: number) => void;
}

const CourseSelector = ({courses, onSelectCourse}: CourseSelectorProps) => {
  const [placeHolder, setPlaceHolder] = useState('강의를 선택하세요');
  const [open, setOpen] = useState(false);

  const handleOnClick = () => {
    setOpen(!open);
  };

  const handleSelectCourse = (id: number, title: string, section: string) => {
    setPlaceHolder(`${title} ${section}`);
    onSelectCourse(id);
  };

  const onMouseLeave = () => {
    setOpen(false);
  };

  return (
    <div className='relative pt-7'>
      <div
        className='flex items-center justify-between w-81 h-[45px] border-1 rounded-[9px] border-stroke px-[14px] cursor-pointer'
        onClick={handleOnClick}>
        <span className='text-light-black'>{placeHolder}</span>
        <ArrowdownIcon width={13.5} height={8} />
      </div>
      {open && (
        <ul
          onMouseLeave={onMouseLeave}
          className='flex flex-col w-81 mt-2 bg-gray border-0 rounded-[9px] absolute shadow-dropdown cursor-pointer'>
          {courses.map((course, index) => (
            <li
              onClick={() =>
                handleSelectCourse(course.id, course.title, course.section)
              }
              key={course.id}
              className={`border-stroke px-[15.5px] py-[13px] ${
                index !== courses.length - 1 ? 'border-b-1' : ''
              } hover:bg-purple-stroke first:rounded-t-[9px] last:rounded-b-[9px]`}>
              {course.title} {course.section}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseSelector;
