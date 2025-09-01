import CourseSelector from './CourseSelector';
import AssignmentList from './AssignmentList';
import Button from '../../common/Button';
import type {Course} from './dummy/types';
import {AddIcon} from '../../../assets/svg';
import {useState} from 'react';

interface AssignmentPageLayoutProps {
  title: string;
  fullCourses: Course[];
  selectMode: boolean;
  onLinkAssignments?: (id: number, title: string, isSelected: boolean) => void;
}

const AssignmentPageLayout = ({
  title,
  fullCourses,
  selectMode,
}: AssignmentPageLayoutProps) => {
  // 강의 선택
  const [courses, setCourses] = useState(fullCourses);
  const onSelectCourse = (courseId: number) => {
    setCourses(fullCourses.filter((course) => course.id === courseId));
  };

  return (
    <div className='mx-auto pb-8 w-[900px] bg-white rounded-[30px]'>
      <div className='flex flex-col h-1/4 px-14 pt-[37px] pb-[22px] justify-center border-b-1 border-stroke'>
        <h3 className='text-2xl font-semibold'>{title}</h3>
        <CourseSelector courses={fullCourses} onSelectCourse={onSelectCourse} />
      </div>
      <div className='px-14'>
        <AssignmentList courses={courses} selectMode={selectMode} />
        {!selectMode && (
          <Button
            theme='secondaryPurpleStroke'
            text='문제 추가'
            icon={<AddIcon width={12} height={12} color='#555267' />}
          />
        )}
        <div className='flex justify-end gap-5 mt-3'>
          <Button theme='primaryWhite' text='취소' />
          <Button theme='primaryPurple' text='저장' />
        </div>
      </div>
    </div>
  );
};

export default AssignmentPageLayout;
