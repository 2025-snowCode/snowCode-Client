import CodeEditor from './ui/CodeEditor';
import AssignmentSideBar from './ui/AssignmentSideBar';
import {assignmentQueries} from '@/entities/assignment/api/assignmentQueries';
import {useLocation, useParams} from 'react-router-dom';
import {useQuery, useSuspenseQueries} from '@tanstack/react-query';
import {courseQueries} from '@/entities/course/api/courseQueries';
import {useAssignmentSubmission} from '@/features/assignment/submit-assignment/lib/useAssignmentSubmission';
import SubmissionResultModal from '@/features/assignment/submit-assignment/ui/SubmissionResultModal';
import {Group, Panel, Separator} from 'react-resizable-panels';
import Terminal from './ui/Terminal';
import {useCodeExecution} from '@/features/assignment/run-assignment/lib/useCodeExecution';
import EllipsisIcon from '@/assets/svg/ellipsisIcon.svg?react';
import AssignmentProblem from './ui/AssignmentProblem';

const AssignmentSubmitPage = () => {
  const location = useLocation();
  const {courseId, assignmentId} = useParams();
  const {index, codeId} = (location.state ?? {}) as {
    index?: number;
    codeId?: number;
  };

  const [{data: assignment}, {data: courseDetails}] = useSuspenseQueries({
    queries: [
      assignmentQueries.getAssignment(Number(assignmentId)),
      courseQueries.getCourseDetails(Number(courseId)),
    ],
  });

  const {data: assignmentCode} = useQuery({
    ...assignmentQueries.getAssignmentCode(Number(codeId || 0)),
    enabled: !!codeId,
  });

  const {runCode, output, isRunning} = useCodeExecution();

  const {onSubmit, result, isSubmitPending, isModalOpen, closeModal} =
    useAssignmentSubmission(courseDetails, Number(assignmentId));

  const isEditorReady = !codeId || (codeId && assignmentCode);

  return (
    <>
      {/* 사이드 바 */}
      <AssignmentSideBar units={courseDetails.units} />

      {/* 웹 ide */}
      <div className='h-full flex gap-4'>
        <div className='basis-2/5 h-full overflow-hidden custom-scrollbar bg-white rounded-[30px] py-3 px-2 shadow-card'>
          <AssignmentProblem index={index} {...assignment} />
        </div>
        <div className='flex-1 min-w-0'>
          <Group
            orientation='vertical'
            className='h-full bg-primary-black rounded-[30px]'>
            <Panel
              id='top-panel'
              minSize='30%'
              className='h-full'
              style={{overflow: 'hidden'}}>
              {isEditorReady ? (
                <CodeEditor
                  key={codeId ?? 'new'}
                  onSubmit={onSubmit}
                  isSubmitPending={isSubmitPending}
                  assignmentCode={assignmentCode?.code}
                  runCode={runCode}
                  isRunning={isRunning}
                />
              ) : (
                <></>
              )}
            </Panel>

            <Separator className='cursor-row-resize flex-center h-3 bg-gray-500 focus:outline-none data-[separator="active"]:bg-gray-600/80'>
              <EllipsisIcon className='w-4.5 h-4.5 text-primary-black' />
            </Separator>

            <Panel id='bottom-panel' minSize='10%'>
              <Terminal output={output} />
            </Panel>
          </Group>
        </div>
      </div>

      {/* 제출 결과 모달 */}
      {isModalOpen && result && (
        <SubmissionResultModal result={result} closeModal={closeModal} />
      )}
    </>
  );
};

export default AssignmentSubmitPage;
