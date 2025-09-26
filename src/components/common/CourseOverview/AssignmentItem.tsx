import type {Assignment} from '../../admin/assignments/dummy/types';
import SubmissionBadge from './SubmissionBadge';

interface AssignmentItemProps extends Assignment {
  index: number;
  isOpen?: boolean;
}

const AssignmentItem = ({
  title,
  index,
  submittedStatus,
  isOpen,
}: AssignmentItemProps) => {
  return (
    <div
      className={`w-100% h-[60px] flex items-center px-74 ${
        index !== 1 && 'border-t-1 border-[#EEEBFC]'
      }`}>
      <div
        className={`w-141 flex-center items-center justify-start ${
          !isOpen && 'opacity-[0.6]'
        }`}>
        {/* 문제 번호 */}
        <span className='w-[31px] py-0.5 flex-center rounded-full border-1 border-purple-stroke text-base text-light-black font-medium'>
          {index}
        </span>
        {/* 문제 제목 */}
        <span
          className={`whitespace-nowrap text-secondary-black text-base font-normal pl-[30px] cursor-pointer ${
            isOpen &&
            'hover:text-primary hover:underline hover:underline-offset-4'
          }`}>
          {title}
        </span>
      </div>
      {isOpen && <SubmissionBadge submittedStatus={submittedStatus} />}
    </div>
  );
};

export default AssignmentItem;
