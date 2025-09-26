import AssignmentPageLayout from '@/components/admin/assignments/AssignmentPageLayout';
import {coursesResponse} from '@/components/admin/assignments/dummy/response';

const AssignmentsPage = () => {
  // 전체 강의 가져오기
  const fullCourses = coursesResponse.response.courses;
  return (
    <AssignmentPageLayout
      title='문제 관리'
      fullCourses={fullCourses}
      selectMode={false}
    />
  );
};

export default AssignmentsPage;
