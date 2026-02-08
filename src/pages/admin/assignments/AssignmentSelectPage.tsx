import {coursesResponse} from '@/components/admin/assignments/dummy/response';
import {useParams} from 'react-router-dom';
import AssignmentPageLayout from '@/components/admin/assignments/AssignmentPageLayout';

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

  return (
    <AssignmentPageLayout
      title='문제 선택'
      fullCourses={fullCourses}
      selectMode={true}
    />
  );
};

export default AssignmentSelectPage;
