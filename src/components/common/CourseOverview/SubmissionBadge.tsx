import type {SubmissionStatus} from '../../admin/assignments/dummy/types';
import correct from '../../../assets/images/correct.svg';
import incorrect from '../../../assets/images/incorrect.svg';
import unsubmitted from '../../../assets/images/unsubmitted.svg';

interface SubmissionBadgeProps {
  submittedStatus?: SubmissionStatus;
}

const label_mapping: Record<
  SubmissionStatus,
  {label: string; variant: string; icon: string}
> = {
  INCORRECT: {
    label: '오답',
    variant: 'border border-[#FF6F6F] text-[#FF6F6F]',
    icon: incorrect,
  },
  CORRECT: {
    label: '정답',
    variant: 'border border-[#856CFF] text-[#856CFF]',
    icon: correct,
  },
  NOT_SUBMITTED: {
    label: '미제출',
    variant: 'border border-[#7D7993 ] text-[#7D7993]',
    icon: unsubmitted,
  },
};

const SubmissionBadge = ({submittedStatus}: SubmissionBadgeProps) => {
  const safeStatus: SubmissionStatus = submittedStatus ?? 'NOT_SUBMITTED';
  const {label, variant, icon} = label_mapping[safeStatus];

  return (
    <div
      className={`inline-flex whitespace-nowrap gap-2 text-center px-3.5 py-1.5 rounded-[35px] mr-auto ${variant}`}>
      <img src={icon} alt={label} />
      <span>{label}</span>
    </div>
  );
};

export default SubmissionBadge;
