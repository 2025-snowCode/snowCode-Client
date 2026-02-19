import AssignmentListContainer from './ui/AssignmentListContainer';
import {useState} from 'react';
import {
  response,
  courseOptionsResponse,
} from '@/shared/mocks/assignmentSelectResponse';
import {useCourseFilter} from '@/features/course/filter-course/lib/useCourseFilter';
import {AssignmentPageLayout} from '@/widgets/assignment-page-layout';
import SelectableItem from '@/shared/ui/SelectableItem';

const AssignmentSelectPage = () => {
  const {courses} = courseOptionsResponse.response; // /courses/my API 응답 모킹
  const [selectedAssignments, setSelectedAssignments] = useState<number[]>([]); // 선택된 문제 ID 목록

  const {courseOptions, handleCourseSelect} = useCourseFilter(courses);

  // 문제 목록 /courses/{courseId}/assignments API 응답 모킹
  const assignmentList = response.response.courses.flatMap(
    (course) => course.assignments
  );

  // 문제 선택 핸들러
  const handleAssignmentSelect = (assignmentId: number) => {
    setSelectedAssignments((prev) => {
      if (prev.includes(assignmentId)) {
        return prev.filter((id) => id !== assignmentId); // 선택 해제
      } else {
        return [...prev, assignmentId]; // 선택 추가
      }
    });
  };

  return (
    <AssignmentPageLayout
      title='문제 선택'
      courseOptions={courseOptions}
      onCourseSelect={handleCourseSelect}
      list={
        <AssignmentListContainer
          items={assignmentList}
          title={`${assignmentList.length}문제`}
          onSelect={handleAssignmentSelect}
          renderItem={(assignment) => (
            <SelectableItem
              title={assignment.title}
              selected={selectedAssignments.includes(assignment.id)}
            />
          )}
        />
      }
      onCancel={() => {}}
      onConfirm={() => {}}
    />
  );
};

export default AssignmentSelectPage;
