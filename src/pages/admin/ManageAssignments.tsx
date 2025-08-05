import {coursesResponse} from '../../components/admin/assignments/dummy/response';
import CourseSelector from '../../components/admin/assignments/CourseSelector';
import {AddIcon} from '../../assets/svg';
import Button from '../../components/common/Button';
import AssignmentList from '../../components/admin/assignments/AssignmentList';
import {useState} from 'react';

const ManageAssignments = () => {
  const fullCourses = coursesResponse.response.courses;
  const [selectedCourses, setCourses] = useState(fullCourses);

  const onSelectCourse = (courseId: number) => {
    setCourses(fullCourses.filter((course) => course.id === courseId));
  };

  return (
    <div className='w-[900px] h-[760px] bg-white rounded-[30px]'>
      <div className='flex flex-col h-1/4 px-14 justify-center border-b-1 border-stroke'>
        <h3 className='text-2xl font-semibold'>문제 관리</h3>
        <CourseSelector courses={fullCourses} onSelectCourse={onSelectCourse} />
      </div>
      <div className='px-14'>
        <AssignmentList courses={selectedCourses} />
        <Button
          theme='secondaryPurpleStroke'
          text='문제 추가'
          icon={<AddIcon width={12} height={12} />}
        />
        <div className='flex justify-end gap-5'>
          <Button theme='primaryWhite' text='취소' />
          <Button theme='primaryPurple' text='저장' />
        </div>
      </div>
    </div>
  );
};

export default ManageAssignments;
