import AssignmentListContainer from './ui/AssignmentListContainer';
import {useState} from 'react';
import {useCourseFilter} from '@/features/course/filter-course/lib/useCourseFilter';
import {AssignmentPageLayout} from '@/widgets/assignment-page-layout';
import ListRow from '@/shared/ui/list-row/ListRow';
import {useQuery} from '@tanstack/react-query';
import {courseQueries} from '@/entities/course/api/courseQueries';
import {assignmentQueries} from '@/entities/assignment/api/assignmentQueries';

const AssignmentSelectPage = () => {
  const {data: courseList} = useQuery(courseQueries.getAllCourses());
  const [selectedAssignments, setSelectedAssignments] = useState<number[]>([]); // 선택된 문제 ID 목록
  const {courseOptions, handleCourseSelect, selectedCourseId} = useCourseFilter(
    courseList?.response.courses ?? []
  );
  const {data: allAssignments} = useQuery(
    assignmentQueries.getAllAssignments()
  );
  const {data: assignments} = useQuery(
    assignmentQueries.getAssignmentsByCourse(selectedCourseId ?? 0)
  );

  const filteredAssignments = assignments?.response.courses.flatMap(
    (course) => course.assignments
  );

  // 선택된 강의에 따라 보여줄 과제 목록 결정
  const assignmentList = selectedCourseId
    ? (filteredAssignments ?? [])
    : (allAssignments?.response.assignments ?? []);

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

  console.log('선택된 강의 ID:', selectedAssignments);

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
            <ListRow
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
