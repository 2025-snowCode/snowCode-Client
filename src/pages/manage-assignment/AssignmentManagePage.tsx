import {AssignmentPageLayout} from '@/widgets/assignment-page-layout';
import AssignmentListContainer from '../select-assignment/ui/AssignmentListContainer';
import ListRow from '@/shared/ui/list-row/ListRow';
import {useCourseFilter} from '@/features/course/filter-course';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {courseQueries} from '@/entities/course/api/courseQueries';
import {useAssignmentList} from '@/features/assignment/filter-assignment/lib/useAssignmentList';
import {assignmentMutations} from '@/entities/assignment/api/assignmentMutations';
import {assignmentQueries} from '@/entities/assignment/api/assignmentQueries';
import AssignmentManageActionsBar from './ui/AssignmentManageActionsBar';
import AddIcon from '@/assets/svg/addIcon.svg?react';
import {Link} from 'react-router-dom';
import {buttonStyles} from '@/shared/ui/button/button-styles';

const AssignmentManagePage = () => {
  const {data: courseList} = useQuery(courseQueries.getAllCourses());
  const {courseOptions, handleCourseSelect, selectedCourseId} = useCourseFilter(
    courseList?.response.courses ?? []
  );
  const assignmentList = useAssignmentList(selectedCourseId);
  const queryClient = useQueryClient();

  // 문제 삭제 뮤테이션
  const {mutate: deleteAssignment} = useMutation({
    ...assignmentMutations.deleteAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: assignmentQueries.getAllAssignments().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: assignmentQueries.getAssignmentsByCourse(
          selectedCourseId ?? 0
        ).queryKey,
      });
      alert('문제가 성공적으로 삭제되었습니다.');
    },
    onError: (error) => {
      console.error('문제 삭제 실패', error);
      alert('문제 삭제에 실패했습니다. 다시 시도해주세요.');
    },
  });

  // 문제 삭제 핸들러
  const onDeleteAssignment = (id: number) => {
    if (
      window.confirm(
        '문제를 삭제하시겠습니까? 삭제된 문제는 복구할 수 없습니다.'
      )
    ) {
      deleteAssignment(id);
    }
  };

  return (
    <AssignmentPageLayout
      title='문제 관리'
      courseOptions={courseOptions}
      onCourseSelect={handleCourseSelect}
      list={
        <>
          <AssignmentListContainer
            items={assignmentList}
            title={`${assignmentList.length}문제`}
            renderItem={(assignment) => (
              <ListRow
                title={assignment.title}
                rightIcon={
                  <AssignmentManageActionsBar
                    id={assignment.id}
                    onDelete={onDeleteAssignment}
                  />
                }
              />
            )}
          />
          <Link
            className={buttonStyles({
              color: 'tonal',
              size: 'compact',
              content: 'mixed',
            })}
            to='/admin/assignments/create'>
            <AddIcon className='w-4 h-4' />
            문제 추가
          </Link>
        </>
      }
      onCancel={() => {}}
      onConfirm={() => {}}
    />
  );
};

export default AssignmentManagePage;
