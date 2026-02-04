import {tv, type VariantProps} from 'tailwind-variants';

export const seletableItemStyles = tv({
  base: 'cursor-pointer bg-background w-full flex items-center rounded-[9px] pl-4.5 pr-7.5 py-4 gap-4 border',
  variants: {
    selected: {
      true: 'border-primary',
      false: 'border-transparent',
    },
  },
});

type SeletableItemVariants = VariantProps<typeof seletableItemStyles>;

interface SeletableItemProps extends SeletableItemVariants {
  selected: boolean;
  leftIcon?: React.ReactNode;
  title: string;
  rightIcon?: React.ReactNode;
}

const SeletableItem = ({
  selected,
  leftIcon,
  title,
  rightIcon,
}: SeletableItemProps) => {
  return (
    <div className={seletableItemStyles({selected})}>
      <div>{leftIcon}</div>
      <p className='text-base/6 font-normal'>{title}</p>
      <div className='ml-auto'>{rightIcon}</div>
    </div>
  );
};

export default SeletableItem;
