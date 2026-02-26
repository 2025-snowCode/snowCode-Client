import Correct from '@/assets/svg/correct.svg?react';
import Incorrect from '@/assets/svg/incorrect.svg?react';
import Unsubmitted from '@/assets/svg/unsubmitted.svg?react';
import {
  indexBadgeStyles,
  scheduleBadgeStyles,
  submissionBadgeStyles,
  type IndexBadgeVariants,
  type ScheduleBadgeVariants,
  type SubmissionBadgeVariants,
} from './badge-styles';

type ScheduleBadgeProps = {
  variant: 'schedule';
  children: React.ReactNode;
} & ScheduleBadgeVariants;

type SubmissionBadgeProps = {
  variant: 'submission';
} & SubmissionBadgeVariants;

type IndexBadgeProps = {
  children: React.ReactNode;
  variant: 'index';
} & IndexBadgeVariants;

type BadgeProps = ScheduleBadgeProps | SubmissionBadgeProps | IndexBadgeProps;

const SubmissionMeta = {
  CORRECT: {
    label: '정답',
    icon: <Correct className='w-3 h-3' />,
  },
  INCORRECT: {
    label: '오답',
    icon: <Incorrect className='w-3 h-3' />,
  },
  NOT_SUBMITTED: {
    label: '미제출',
    icon: <Unsubmitted className='w-3 h-3' />,
  },
} as const;

const Badge = (props: BadgeProps) => {
  const {variant} = props;

  switch (variant) {
    // 일정 배지
    case 'schedule':
      return (
        <span className={scheduleBadgeStyles({schedule: props.schedule})}>
          {props.children}일 전
        </span>
      );

    // 인덱스 배지 (단원, 문제 등)
    case 'index': {
      const suffix = props.kind === 'unit' ? '단원' : ' 문제';

      return (
        <span className={indexBadgeStyles({kind: props.kind})}>
          {props.children}
          {suffix}
        </span>
      );
    }

    // 제출 상태 배지
    case 'submission': {
      const {label, icon} = SubmissionMeta[props.status!];

      return (
        <span
          className={submissionBadgeStyles({
            status: props.status,
          })}>
          {icon} {label}
        </span>
      );
    }
  }
};

export default Badge;
