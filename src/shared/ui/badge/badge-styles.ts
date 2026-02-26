import {tv, type VariantProps} from 'tailwind-variants/lite';
export const badgeStyles = tv({
  base: 'rounded-full px-3.5 py-1.5 leading-[19px] text-center text-base font-medium border whitespace-nowrap',
});

export const scheduleBadgeStyles = tv({
  extend: badgeStyles,
  variants: {
    schedule: {
      upcoming:
        'bg-radial-[50%_50%_at_50%_50%] from-[#7D63FF] from-38% to-[#AB9AFF] to-100% text-white',
      later: 'bg-[#403D4D] border-[#5C5B7F] text-white',
    },
  },
});

export const submissionBadgeStyles = tv({
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

export const indexBadgeStyles = tv({
  extend: badgeStyles,
  variants: {
    kind: {
      unit: 'bg-secondary-black border-secondary-black text-white',
      problem: 'bg-light-black border-light-black text-white',
    },
  },
});

export type ScheduleBadgeVariants = VariantProps<typeof scheduleBadgeStyles>;
export type SubmissionBadgeVariants = VariantProps<
  typeof submissionBadgeStyles
>;
export type IndexBadgeVariants = VariantProps<typeof indexBadgeStyles>;
