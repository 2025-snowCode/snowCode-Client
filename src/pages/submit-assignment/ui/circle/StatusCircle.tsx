import CheckIcon from '@/assets/svg/checkIcon.svg?react';
import {tv, type VariantProps} from 'tailwind-variants';

export const statusCircleStyles = tv({
  base: 'flex-center rounded-full border',
  variants: {
    color: {
      primary: 'bg-primary border-primary text-white',
      secondary: 'bg-background border-purple-stroke text-primary',
    },
    size: {
      small: 'w-6 h-6',
      medium: 'w-[31px] h-[31px]',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'medium',
  },
});

type StatusCircleVariants = VariantProps<typeof statusCircleStyles>;
type StatusCircleProps = StatusCircleVariants;

const StatusCircle = (props: StatusCircleProps) => {
  return (
    <div className={statusCircleStyles(props)}>
      <CheckIcon className='w-3 h-3' />
    </div>
  );
};

export default StatusCircle;
