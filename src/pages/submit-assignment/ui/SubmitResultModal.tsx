import type {TAssignmentSubmissionResult} from '@/entities/assignment/model/schemas';
import DeleteIcon from '@/assets/svg/deleteIcon.svg?react';

const RESULT_NOTICE_TITLE = {
  PASS: '제출한 코드가 모든 테스트 케이스를 통과했어요!',
  FAIL: '아직이에요! 제출한 코드가 모든 테스트 케이스를 통과하지 못했어요.',
};

interface SubmitResultModalProps {
  result: TAssignmentSubmissionResult;
  closeModal: () => void;
}

const SubmitResultModal = ({result, closeModal}: SubmitResultModalProps) => {
  const flag = result.score === 100 ? 'PASS' : 'FAIL';

  return (
    <>
      <div className='fixed inset-0 z-50 flex-center'>
        <div
          className={`w-160 flex flex-col rounded-[10px] text-secondary-black shadow-card ${flag === 'PASS' ? 'bg-[#F2FFEB]' : 'bg-[#FFF4F4]'}`}>
          <div
            className={`w-full flex flex-row justify-between items-center rounded-t-[10px] px-6.5 py-5 ${flag === 'PASS' ? 'bg-[#99FF62] text-secondary-black' : 'bg-[#FF6F6F] text-white'}`}>
            <h3 className='text-base font-medium'>
              {RESULT_NOTICE_TITLE[flag]}
            </h3>
            <DeleteIcon className='cursor-pointer' onClick={closeModal} />
          </div>
          <p className='px-6.5 py-4 text-sm/6'>획득 점수: {result.score}점</p>
        </div>
      </div>

      <div className='overlay fixed inset-0 z-40 bg-black/45 opacity-100 transition-opacity duration-150' />
    </>
  );
};

export default SubmitResultModal;
