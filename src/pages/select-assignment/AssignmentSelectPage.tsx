import AssignmentListContainer from './ui/AssignmentListContainer';
import {useState} from 'react';
import {useCourseFilter} from '@/features/course/filter-course/lib/useCourseFilter';
import {AssignmentPageLayout} from '@/widgets/assignment-page-layout';
import ListRow from '@/shared/ui/list-row/ListRow';
import {useSuspenseQuery} from '@tanstack/react-query';
import {courseQueries} from '@/entities/course/api/courseQueries';
import useUnitStore from '@/entities/unit/model/useUnitStore';
import {useLocation, useNavigate} from 'react-router-dom';
import type {Assignment} from '@/entities/assignment/model/types';
import {useAssignmentList} from '@/features/assignment/filter-assignment/lib/useAssignmentList';
import Button from '@/shared/ui/button/Button';

const AssignmentSelectPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    data: {courses},
  } = useSuspenseQuery(courseQueries.getAllCourses());
  const {setAssignments, assignments: currentSelectedAssignments} =
    useUnitStore();
  const [selectedAssignments, setSelectedAssignments] = useState<Assignment[]>(
    currentSelectedAssignments
  );
  const {courseOptions, handleCourseSelect, selectedCourseId} =
    useCourseFilter(courses);

  const assignmentList = useAssignmentList(selectedCourseId);

  // 문제 선택 핸들러
  const handleAssignmentSelect = (assignment: Assignment) => {
    setSelectedAssignments((prev) => {
      if (prev.some((a) => a.id === assignment.id)) {
        return prev.filter((a) => a.id !== assignment.id);
      }
      return [...prev, assignment];
    });
  };

  // 이전 페이지로 돌아가기
  const returnToPreviousPage = () => {
    navigate(location.state?.backPath ?? -1);
  };

  // 등록 핸들러
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
              className='cursor-pointer'
            />
          )}
        />
      }
      buttons={
        <div className='flex gap-5'>
          <Button color='outlinePurple' onClick={() => returnToPreviousPage()}>
            취소
          </Button>
          <Button color='primary' onClick={handleConfirm}>
            등록
          </Button>
        </div>
      }
    />
  );
};

export default AssignmentSelectPage;
