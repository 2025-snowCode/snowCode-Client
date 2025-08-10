import {coursesResponse} from '../../components/admin/assignments/dummy/response';
import {useState} from 'react';
import {useParams} from 'react-router-dom';
import type {Assignment} from '../../components/admin/assignments/dummy/types';
import AssignmentPageLayout from '../../components/admin/assignments/AssignmentPageLayout';

const AssignmentSelectPage = () => {
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

  // 선택된 문제 업데이트
  const [linkedAssignments, setLinkedAssignments] = useState<Assignment[]>([]);

  const onLinkAssignments = (
    id: number,
    title: string,
    isSelected: boolean
  ) => {
    setLinkedAssignments((prev) => {
      if (isSelected) {
        return [...prev, {id, title}];
      }
      return prev.filter((a) => a.id !== id);
    });
  };

  return (
    <AssignmentPageLayout
      title='문제 선택'
      fullCourses={fullCourses}
      selectMode={true}
      onLinkAssignments={onLinkAssignments}
    />
  );
};

export default AssignmentSelectPage;
