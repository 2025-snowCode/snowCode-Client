import {tv, type VariantProps} from 'tailwind-variants/lite';
import Correct from '@/assets/svg/correct.svg?react';
import Incorrect from '@/assets/svg/incorrect.svg?react';
import Unsubmitted from '@/assets/svg/unsubmitted.svg?react';

const badgeStyles = tv({
  base: 'rounded-full px-3.5 py-1.5 leading-[19px] text-center text-base font-medium border whitespace-nowrap',
});

const scheduleBadgeStyles = tv({
  extend: badgeStyles,
  variants: {
    schedule: {
      upcoming:
        'bg-radial-[50%_50%_at_50%_50%] from-[#7D63FF] from-38% to-[#AB9AFF] to-100% border-0 text-white',
      later: 'bg-[#403D4D] border-[#5C5B7F] text-white',
    },
  },
});

const submissionBadgeStyles = tv({
  extend: badgeStyles,
  base: 'bg-transparent flex-center gap-2 text-sm',
  variants: {
    status: {
      CORRECT: 'border-primary text-primary',
      INCORRECT: 'border-[#FF6F6F] text-[#FF6F6F]',
      NOT_SUBMITTED: 'border-light-black text-light-black',
    },
  },
});

const indexBadgeStyles = tv({
  extend: badgeStyles,
  variants: {
    kind: {
      unit: 'bg-secondary-black border-secondary-black text-white',
      problem: 'bg-light-black border-light-black text-white',
    },
  },
});

type ScheduleBadgeProps = {
  variant: 'schedule';
  children: React.ReactNode;
} & VariantProps<typeof scheduleBadgeStyles>;

type SubmissionBadgeProps = {
  variant: 'submission';
} & VariantProps<typeof submissionBadgeStyles>;

type IndexBadgeProps = {
  children: React.ReactNode;
  variant: 'index';
} & VariantProps<typeof indexBadgeStyles>;

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
    case 'index':
      const suffix = props.kind === 'unit' ? '단원' : ' 문제';

      return (
        <span className={indexBadgeStyles({kind: props.kind})}>
          {props.children}
          {suffix}
        </span>
      );

    // 제출 상태 배지
    case 'submission':
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
};

export default Badge;
