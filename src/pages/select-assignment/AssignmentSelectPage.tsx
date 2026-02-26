import AssignmentListContainer from './ui/AssignmentListContainer';
import {useState} from 'react';
import {useCourseFilter} from '@/features/course/filter-course/lib/useCourseFilter';
import {AssignmentPageLayout} from '@/widgets/assignment-page-layout';
import ListRow from '@/shared/ui/list-row/ListRow';
import {useQuery} from '@tanstack/react-query';
import {courseQueries} from '@/entities/course/api/courseQueries';
import {assignmentQueries} from '@/entities/assignment/api/assignmentQueries';
import useUnitStore from '@/entities/unit/model/useUnitStore';
import {useLocation, useNavigate} from 'react-router-dom';
import type {Assignment} from '@/entities/assignment/model/types';

const AssignmentSelectPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {data: courseList} = useQuery(courseQueries.getAllCourses());
  const {setAssignments, assignments: currentSelectedAssignments} =
    useUnitStore();
  const [selectedAssignments, setSelectedAssignments] = useState<Assignment[]>(
    currentSelectedAssignments ?? []
  );
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
  const handleAssignmentSelect = (assignment: Assignment) => {
    setSelectedAssignments((prev) => {
      if (prev.some((a) => a.id === assignment.id)) {
        return prev.filter((a) => a.id !== assignment.id);
      }
      return [...prev, assignment];
    });
  };

  const returnToPreviousPage = () => {
    navigate(location.state?.backPath ?? -1, {
      state: {
        mode: location.state?.mode,
        unitId: location.state?.unitId,
        currentIndex: location.state?.currentIndex,
      },
    });
  };

  const handleConfirm = () => {
    setAssignments(selectedAssignments);
    returnToPreviousPage();
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
            <ListRow
              title={assignment.title}
              selected={selectedAssignments.some((a) => a.id === assignment.id)}
            />
          )}
        />
      }
      onCancel={() => {
        returnToPreviousPage();
      }}
      onConfirm={handleConfirm}
    />
  );
};

export default AssignmentSelectPage;
