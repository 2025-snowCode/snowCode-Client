import AssignmentListContainer from '@/entities/assignment/ui/AssignmentListContainer';
import {useState} from 'react';
import {useCourseFilter} from '@/features/course/filter-course/lib/useCourseFilter';
import {AssignmentPageLayout} from '@/widgets/assignment-page-layout';
import ListRow from '@/shared/ui/list-row/ListRow';
import {useSuspenseQuery} from '@tanstack/react-query';
import {courseQueries} from '@/entities/course/api/courseQueries';
import {useUnitStore} from '@/entities/unit/model/useUnitStore';
import {useLocation, useNavigate} from 'react-router-dom';
import type {TAssignment} from '@/entities/assignment/model/schemas';
import {useAssignmentList} from '@/features/assignment/filter-assignment/lib/useAssignmentList';
import Button from '@/shared/ui/button/Button';
import {Checkbox} from '@/shared/ui/checkbox/Checkbox';

const AssignmentSelectPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    data: {courses},
  } = useSuspenseQuery(courseQueries.getAllCourses());
  const {setAssignments, assignments: currentSelectedAssignments} =
    useUnitStore();
  const [selectedAssignments, setSelectedAssignments] = useState<TAssignment[]>(
    currentSelectedAssignments
  );
  const {
    courseOptions,
    handleCourseSelect,
    selectedCourseId,
    selectedCourseLabel,
  } = useCourseFilter(courses);

  const assignmentList = useAssignmentList(selectedCourseId!);

  // 문제 선택 핸들러
  const handleAssignmentSelect = (assignment: TAssignment) => {
    setSelectedAssignments((prev) => {
      if (prev.some((a) => a.id === assignment.id)) {
        return prev.filter((a) => a.id !== assignment.id);
      }
      return [...prev, assignment];
    });
  };

  // 이전 페이지로 돌아가기
  const returnToPreviousPage = () => {
    const backPath = location.state?.backPath;
    if (backPath) {
      navigate(backPath, {state: {fromAssignmentSelect: true}});
    } else {
      navigate(-1);
    }
  };

  // 등록 핸들러
  const handleConfirm = () => {
    setAssignments(selectedAssignments);
    returnToPreviousPage();
  };

  const isSelected = (assignment: TAssignment) => {
    return selectedAssignments.some((a) => a.id === assignment.id);
  };

  return (
    <AssignmentPageLayout
      title='문제 선택'
      courseOptions={courseOptions}
      courseValue={selectedCourseLabel}
      onCourseSelect={handleCourseSelect}
      list={
        <AssignmentListContainer
          items={assignmentList}
          title={`${assignmentList.length}문제`}
          onSelect={handleAssignmentSelect}
          renderItem={(assignment) => (
            <ListRow
              title={assignment.title}
              selected={isSelected(assignment)}
              leftIcon={
                <Checkbox
                  checked={isSelected(assignment)}
                  onChange={() => handleAssignmentSelect(assignment)}
                />
              }
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
