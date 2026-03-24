import {tv, type VariantProps} from 'tailwind-variants';

export const ListRowStyles = tv({
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

export type ListRowVariants = VariantProps<typeof ListRowStyles>;
