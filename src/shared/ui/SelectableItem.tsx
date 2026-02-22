import {tv, type VariantProps} from 'tailwind-variants';

const selectableItemStyles = tv({
  base: 'cursor-pointer bg-background w-full flex items-center rounded-[9px] pl-4.5 pr-7.5 py-4 gap-4 border',
  variants: {
    selected: {
      true: 'border-primary',
      false: 'border-transparent',
    },
  },
  defaultVariants: {
    selected: false,
  },
});

type SelectableItemVariants = VariantProps<typeof selectableItemStyles>;

interface SelectableItemProps extends SelectableItemVariants {
  selected?: boolean;
  leftIcon?: React.ReactNode;
  title: string;
  rightIcon?: React.ReactNode;
  className?: string;
}

const SelectableItem = ({
  selected = false,
  leftIcon,
  title,
  rightIcon,
  className,
}: SelectableItemProps) => {
  return (
    <div className={selectableItemStyles({selected, className})}>
      <div>{leftIcon}</div>
      <p className='text-base/6 font-normal'>{title}</p>
      <div className='ml-auto'>{rightIcon}</div>
    </div>
  );
};

export default SelectableItem;
