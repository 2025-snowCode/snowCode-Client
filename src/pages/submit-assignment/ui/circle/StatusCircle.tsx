import CheckIcon from '@/assets/svg/checkIcon.svg?react';
import DeleteIcon from '@/assets/svg/deleteIcon.svg?react';
import {circleStyles, type CircleVariants} from './circle-styles';
import type {SubmissionStatus} from '@/shared/model/types';
import type {ReactNode} from 'react';

type StatusVariant = SubmissionStatus | 'PASSED' | 'FAILED' | 'NEUTRAL';
interface StatusCircleProps extends CircleVariants {
  variant: StatusVariant;
}

const statusColorMap: Record<StatusVariant, CircleVariants['color']> = {
  NOT_SUBMITTED: 'secondary',
  CORRECT: 'primary',
  INCORRECT: 'danger',
  PASSED: 'success',
  FAILED: 'danger',
  NEUTRAL: 'plain',
};

const iconMap: Record<StatusVariant, ReactNode> = {
  NOT_SUBMITTED: <CheckIcon className='w-3 h-3' />,
  CORRECT: <CheckIcon className='w-3 h-3' />,
  INCORRECT: <DeleteIcon className='w-3 h-3' />,
  PASSED: <CheckIcon className='w-3 h-3' />,
  FAILED: <DeleteIcon className='w-3 h-3' />,
  NEUTRAL: <CheckIcon className='w-3 h-3' />,
};

const StatusCircle = ({variant, ...props}: StatusCircleProps) => {
  return (
    <div className={circleStyles({...props, color: statusColorMap[variant]})}>
      {iconMap[variant]}
    </div>
  );
};

export default StatusCircle;
