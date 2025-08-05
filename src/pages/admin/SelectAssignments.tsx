import CourseSelector from '../../components/admin/assignments/CourseSelector';
import Button from '../../components/common/Button';
import AssignmentList from '../../components/admin/assignments/AssignmentList';
import {coursesResponse} from '../../components/admin/assignments/dummy/response';
import {useState} from 'react';
import {useParams} from 'react-router-dom';
import type {Assignment} from '../../components/admin/assignments/dummy/types';

const SelectAssignments = () => {
  // url에서 course id 가져오기
  const courseId = Number(useParams().id);

  // 강의명 찾기
  const courseTitle = coursesResponse.response.courses.find(
    (course) => course.id === courseId
  )?.title;

  // 기본 문제 목록
  const fullCourses = coursesResponse.response.courses.filter(
    (course) => course.title === courseTitle
  );

  // 강의 선택
  const [courses, setCourses] = useState(fullCourses);

  const onSelectCourse = (courseId: number) => {
    setCourses(fullCourses.filter((course) => course.id === courseId));
  };

  // 선택된 문제 업데이트
  const [linkedAssignments, setLinkedAssignments] = useState<Assignment[]>([]);

  const onLinkAssignments = (
    id: number,
    title: string,
    isSelected: boolean
  ) => {
    if (isSelected) {
      setLinkedAssignments([...linkedAssignments, {id: id, title: title}]);
    } else {
      setLinkedAssignments(
        linkedAssignments.filter((assignment) => assignment.id !== id)
      );
    }
  };

  return (
    <div className='mx-auto pt-9 pb-8 w-[900px] bg-white rounded-[30px]'>
      <div className='flex flex-col h-1/4 px-14 pb-[22px] justify-center border-b-1 border-stroke'>
        <h3 className='text-2xl font-semibold'>문제 선택</h3>
        <CourseSelector courses={fullCourses} onSelectCourse={onSelectCourse} />
      </div>
      <div className='px-14'>
        <AssignmentList
          courses={courses}
          select={true}
          onLinkAssignments={onLinkAssignments}
        />
        <div className='flex justify-end gap-5 mt-14'>
          <Button theme='primaryWhite' text='취소' />
          <Button theme='primaryPurple' text='저장' />
        </div>
      </div>
    </div>
  );
};

export default SelectAssignments;
