import AssignmentDetails from './ui/AssignmentDetails';
import CodeEditor from './ui/CodeEditor';
import AssignmentSideBar from './ui/AssignmentSideBar';
import {assignmentQueries} from '@/entities/assignment/api/assignmentQueries';
import {useLocation, useParams} from 'react-router-dom';
import {useSuspenseQueries} from '@tanstack/react-query';
import {courseQueries} from '@/entities/course/api/courseQueries';
import {useAssignmentSubmit} from '@/features/assignment/submit-assignment/lib/useAssignmentSubmit';
import SubmitResultModal from './ui/SubmitResultModal';

const AssignmentSubmitPage = () => {
  const location = useLocation();
  const {courseId, assignmentId} = useParams();
  const {index} = (location.state ?? {}) as {index?: number};

  const [{data: assignmentDetails}, {data: courseDetails}] = useSuspenseQueries(
    {
      queries: [
        assignmentQueries.getAssignmentDetails(Number(assignmentId)),
        courseQueries.getCourseDetails(Number(courseId)),
      ],
    }
  );

  const {onSubmit, isSubmitPending, result, isModalOpen, closeModal} =
    useAssignmentSubmit(courseDetails, Number(assignmentId));

  return (
    <>
      <div className='h-full flex gap-4'>
        <AssignmentSideBar units={courseDetails.units} />
        <div className='w-127.5 h-full overflow-hidden custom-scrollbar py-3 px-2 bg-white rounded-[30px] shadow-card'>
          <AssignmentDetails index={index} {...assignmentDetails} />
        </div>
        <div className='flex-1 min-w-0'>
          {/* TODO: 코드 에디터 및 제출상태 표시 영역 */}
          <CodeEditor onSubmit={onSubmit} isSubmitPending={isSubmitPending} />
        </div>

        {isModalOpen && result && (
          <SubmitResultModal result={result} closeModal={closeModal} />
        )}
      </div>
    </>
  );
};

export default AssignmentSubmitPage;
