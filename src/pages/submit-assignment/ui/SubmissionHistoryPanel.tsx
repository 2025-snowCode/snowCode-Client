import type {TAssignmentSubmissionHistory} from '@/entities/assignment/model/schemas';
import {formatDaysAgo} from '@/shared/lib/course';
import StatusCircle from './circle/StatusCircle';
import RetrieveIcon from '@/assets/svg/retrieveIcon.svg?react';

interface SubmissionHistoryPanelProps {
  submissionList: TAssignmentSubmissionHistory['submissionList'];
  currentCodeId?: number;
  onRetrieve?: (codeId: number) => void;
}

const SubmissionHistoryPanel = ({
  submissionList,
  currentCodeId,
  onRetrieve,
}: SubmissionHistoryPanelProps) => {
  return (
    <section aria-label='제출 내역'>
      <ul className='py-5 px-12.5 flex flex-col gap-5'>
        {submissionList.map((submission, index) => (
          <li
            key={submission.codeId}
            className='flex items-center justify-between text-white font-base font-normal'>
            <span className='flex items-center gap-6'>
              <StatusCircle
                variant={submission.isSuccess ? 'PASSED' : 'FAILED'}
              />
              {`#${submissionList.length - index} ${submission.isSuccess ? '맞았습니다!' : '틀렸습니다'}`}
            </span>
            <span className='flex items-center gap-4.75'>
              <time
                dateTime={submission.submittedAt}
                className={`px-3.5 py-1.5
                  ${
                    submission.codeId === currentCodeId
                      ? 'bg-[#CAC2F7] rounded-[35px]'
                      : 'bg-transparent'
                  }
                `}>
                {formatDaysAgo(submission.submittedAt)}
              </time>
              <button
                type='button'
                aria-label={`#${submissionList.length - index} 제출 코드 불러오기`}
                onClick={() => onRetrieve?.(submission.codeId)}>
                <RetrieveIcon className='w-4 h-4 cursor-pointer' />
              </button>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SubmissionHistoryPanel;
