import AssignmentDetails from './ui/AssignmentDetails';
import CodeEditor from './ui/CodeEditor';
import AssignmentSideBar from './ui/AssignmentSideBar';
import {assignmentQueries} from '@/entities/assignment/api/assignmentQueries';
import {useLocation, useParams} from 'react-router-dom';
import {useSuspenseQueries} from '@tanstack/react-query';
import {courseQueries} from '@/entities/course/api/courseQueries';
import {useAssignmentSubmit} from '@/features/assignment/submit-assignment/lib/useAssignmentSubmit';
import SubmitResultModal from './ui/SubmitResultModal';
import {tcFailResponse, tcPassResponse} from './mock';

const AssignmentSubmitPage = () => {
  const location = useLocation();
  const {courseId, assignmentId} = useParams();
  const {index} = (location.state ?? {}) as {index?: number};
  const result = tcFailResponse.response;

  const [{data: assignmentDetails}, {data: courseDetails}] = useSuspenseQueries(
    {
      queries: [
        assignmentQueries.getAssignmentDetails(Number(assignmentId)),
        courseQueries.getCourseDetails(Number(courseId)),
      ],
    }
  );

  const {onSubmit, isSubmitPending, isModalOpen, closeModal} =
    useAssignmentSubmit(courseDetails, Number(assignmentId)); // result 임시 제거

  return (
    <>
      {/* 사이드 바 */}
      <AssignmentSideBar units={courseDetails.units} />

      {/* 메인 컨텐츠 - 과제 정보 및 웹 ide */}
      <div className='h-full flex gap-4'>
        <div className='basis-2/5 h-full overflow-hidden custom-scrollbar bg-white rounded-[30px] py-3 px-2 shadow-card'>
          <AssignmentDetails index={index} {...assignmentDetails} />
        </div>
        <div className='flex-1 min-w-0'>
          <CodeEditor onSubmit={onSubmit} isSubmitPending={isSubmitPending} />
        </div>
      </div>

      {/* 제출 결과 모달 */}
      {isModalOpen && result && (
        <SubmitResultModal result={result} closeModal={closeModal} />
      )}
    </>
  );
};

export default AssignmentSubmitPage;
