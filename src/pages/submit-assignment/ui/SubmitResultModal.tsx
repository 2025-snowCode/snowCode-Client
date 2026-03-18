// import type {TAssignmentSubmissionResult} from '@/entities/assignment/model/schemas';
import DeleteIcon from '@/assets/svg/deleteIcon.svg?react';
import StatusCircle from './circle/StatusCircle';
import {tv} from 'tailwind-variants';

const RESULT_MESSAGE = {
  PASSED: '제출한 코드가 모든 테스트 케이스를 통과했어요!',
  FAILED: '아직이에요! 제출한 코드가 테스트 케이스를 통과하지 못했어요.',
};
const VISIBLE_TC_LIMIT = 4;

const modalStyles = tv({
  slots: {
    base: 'w-160 flex flex-col rounded-[24px] text-secondary-black shadow-card',
    header:
      'w-full flex justify-between items-center rounded-t-[24px] px-6.5 py-5',
    titleWrapper: 'flex items-center gap-3',
    title: 'text-base font-medium',
    contentWrapper:
      'flex flex-col min-h-25 pl-6.5 pr-21.25 pt-3.5 pb-7 text-secondary-black',
    tcWrapper: 'flex items-center gap-3.5',
    tcDescription: 'text-base/6',
    outputWrapper: 'flex flex-col gap-1.5',
    outputTerm: 'text-sm/[21px] text-light-black',
    outputDescription: 'bg-white rounded-[10px] px-6 py-1.5 text-sm',
  },
  variants: {
    color: {
      PASSED: {
        header: 'bg-[#99FF62] text-secondary-black',
        base: 'bg-[#F2FFEB]',
      },
      FAILED: {
        header: 'bg-[#FF6F6F] text-white',
        base: 'bg-[#FFF4F4]',
      },
    },
  },
});

interface SubmitResultModalProps {
  // result: TAssignmentSubmissionResult;
  result: {
    isSuccess: boolean;
    totalCount: number;
    passCount: number;
    failedTestCase: {
      testCaseId: number;
      expected: string | null;
    };
  };
  closeModal: () => void;
}

const SubmitResultModal = ({closeModal, result}: SubmitResultModalProps) => {
  const status = result.isSuccess ? 'PASSED' : 'FAILED';

  const styles = modalStyles({color: status});

  const visiblePassCount = Math.min(result.passCount, VISIBLE_TC_LIMIT);
  const hiddenPassCount = result.passCount - visiblePassCount;

  return (
    <>
      <div className='fixed inset-0 z-50 flex-center'>
        <div className={styles.base()}>
          <div className={styles.header()}>
            <div className={styles.titleWrapper()}>
              <StatusCircle variant={'NEUTRAL'} size='sm' />
              <h3 className={styles.title()}>{RESULT_MESSAGE[status]}</h3>
            </div>
            <button className='cursor-pointer' onClick={closeModal}>
              <DeleteIcon className='w-4 h-4' />
            </button>
          </div>

          {status === 'PASSED' && (
            <div className={styles.contentWrapper({class: 'gap-2'})}>
              <div className='flex flex-col gap-1.5'>
                {Array.from({length: visiblePassCount}, (_, index) => (
                  <div className={styles.tcWrapper()} key={index}>
                    <StatusCircle variant={'PASSED'} size='sm' />
                    <p className={styles.tcDescription()}>
                      테스트 {index + 1}: 성공
                    </p>
                  </div>
                ))}
              </div>
              {hiddenPassCount > 0 && (
                <p className={styles.tcDescription()}>
                  그 외 {hiddenPassCount}개의 테스트 성공
                </p>
              )}
            </div>
          )}

          {status === 'FAILED' && (
            <div className={styles.contentWrapper({class: 'gap-3.5'})}>
              <div className={styles.tcWrapper()}>
                <StatusCircle variant={'FAILED'} size='sm' />
                <p className={styles.tcDescription()}>
                  테스트 {result.passCount + 1}: 실패
                </p>
              </div>
              {result.failedTestCase.expected && (
                <dl className={styles.outputWrapper()}>
                  <dt className={styles.outputTerm()}>사용자 출력</dt>
                  <dd className={styles.outputDescription({class: 'mb-2.5'})}>
                    {/* TODO: 응답에 실제 출력값 필드 추가되면 수정 */}
                    <pre className='py-1.5'>
                      {result.failedTestCase.expected}
                    </pre>
                  </dd>
                  <dt className={styles.outputTerm()}>예상 출력</dt>
                  <dd className={styles.outputDescription()}>
                    <pre className='py-1.5'>
                      {result.failedTestCase.expected}
                    </pre>
                  </dd>
                </dl>
              )}
            </div>
          )}
        </div>
      </div>

      <div className='overlay fixed inset-0 z-40 bg-black/45 opacity-100 transition-opacity duration-150' />
    </>
  );
};

export default SubmitResultModal;
