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
      className={`h-[60px] flex items-center justify-between px-80 ${
        index !== 1 && 'border-t-1 border-[#EEEBFC]'
      }`}>
      <div className={`flex-center ${!isOpen && 'opacity-[0.6]'}`}>
        <span className='w-[31px] py-0.5 flex-center rounded-full border-1 border-purple-stroke text-base text-light-black font-medium'>
          {index}
        </span>
        <span
          className={`text-secondary-black text-base font-normal pl-[30px] curosr-pointer ${
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
