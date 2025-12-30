import {tv, type VariantProps} from 'tailwind-variants/lite';

const button = tv({
  base: 'cursor-pointer flex-center text-center gap-2 text-base font-medium whitespace-nowrap rounded-[10px] border',
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
      compact: 'w-fit leading-5 px-3 py-1.5',
      wide: 'w-40 py-[15px]',
      none: 'p-0',
    },
    isIcon: {
      true: 'rounded-full w-16 h-16',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'default',
    disabled: false,
    isIcon: false,
  },
});

type ButtonVariants = VariantProps<typeof button>;

interface ButtonProps extends ButtonVariants {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  ...props
}: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled} className={button(props)}>
      {children}
    </button>
  );
};

export default Button;
