import {tv, type VariantProps} from 'tailwind-variants/lite';

export const buttonStyles = tv({
  base: 'cursor-pointer rounded-[10px] border',
  variants: {
    color: {
      primary: 'bg-primary text-white border-primary',
      secondary:
        'bg-white text-primary-black border-purple-stroke hover:bg-hover hover:text-white',
      outlinePurple: 'bg-white text-primary border-primary',
      outlineWhite: 'bg-transparent text-white border-white',
      tonal: 'bg-purple-stroke text-secondary-black border-purple-stroke',
      ghost: 'bg-transparent text-black border-none',
      ghostWhite: 'bg-white text-secondary-black border-none',
    },
    size: {
      default: 'w-24 h-10 px-3 py-1.5',
      compact: 'w-fit px-3 py-1.5 leading-5',
      wide: 'w-40 py-[15px]',
      none: 'p-0',
      icon: 'w-16 h-16 p-0 rounded-full', // 아이콘 버튼 rounded 속성 적용
    },
    content: {
      text: 'text-center text-base font-medium whitespace-nowrap',
      icon: 'flex-center',
      mixed:
        'flex-center gap-2 text-center text-base font-medium whitespace-nowrap',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'default',
    content: 'text',
  },
});

export type ButtonVariants = VariantProps<typeof buttonStyles>;
