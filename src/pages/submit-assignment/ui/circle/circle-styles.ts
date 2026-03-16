import {tv, type VariantProps} from 'tailwind-variants';

export const circleStyles = tv({
  base: 'flex-center rounded-full border shrink-0',
  variants: {
    color: {
      primary: 'bg-primary border-primary text-white',
      secondary: 'bg-background border-purple-stroke text-primary',
      success: 'bg-[#C4FFA4] border-[#C4FFA4] text-light-black',
      danger: 'bg-[#FF6F6F] border-[#FF6F6F] text-white',
    },
    size: {
      sm: 'w-6 h-6',
      md: 'w-[31px] h-[31px]',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
});

export type CircleVariants = VariantProps<typeof circleStyles>;
