import {tv, type VariantProps} from 'tailwind-variants/lite';

const badgeStyles = tv({
  base: 'rounded-[35px] px-3.5 py-1.5 text-center text-base font-medium border whitespace-nowrap',
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
  base: 'bg-transparent flex-center',
  variants: {
    status: {
      correct: 'border-primary text-primary',
      incorrect: 'border-[#FF6F6F] text-[#FF6F6F]',
      pending: 'border-light-black text-light-black',
    },
    onlyIcon: {
      true: 'rounded-full',
      false: 'gap-2',
    },
  },
  defaultVariants: {
    onlyIcon: false,
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
} & VariantProps<typeof scheduleBadgeStyles>;

type SubmissionBadgeProps = {
  variant: 'submission';
} & VariantProps<typeof submissionBadgeStyles>;

type IndexBadgeProps = {
  variant: 'index';
} & VariantProps<typeof indexBadgeStyles>;

type BadgeProps = (
  | ScheduleBadgeProps
  | SubmissionBadgeProps
  | IndexBadgeProps
) & {
  children: React.ReactNode;
  className?: string;
};

const Badge = ({children, variant, className, ...props}: BadgeProps) => {
  const renderBadgeVariant = () => {
    if (variant === 'schedule') {
      // 일정 배지
      return scheduleBadgeStyles({className, ...props});
    } else if (variant === 'submission') {
      // 제출 상태 배지
      return submissionBadgeStyles({className, ...props});
    } else if (variant === 'index') {
      // 인덱스 배지 (단원, 문제 등)
      return indexBadgeStyles({className, ...props});
    }
  };
  return <span className={renderBadgeVariant()}>{children}</span>;
};

export default Badge;
