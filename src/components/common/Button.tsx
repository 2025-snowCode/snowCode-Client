import {tv, type VariantProps} from 'tailwind-variants/lite';

const button = tv({
  base: 'flex-center px-3 py-1.5 text-center text-base font-medium whitespace-nowrap rounded-[10px] border',
  variants: {
    color: {
      primary: 'bg-primary text-white border-primary',
      secondary: 'bg-white text-primary-black border-purple-stroke',
      outlinePurple: 'bg-white text-primary border-primary',
      outlineWhite: 'bg-transparent text-white border-white',
      tonal: 'bg-purple-stroke text-secondary-black border-purple-stroke',
    },
    isIcon: {
      true: 'rounded-full',
    },
  },
  defaultVariants: {
    color: 'primary',
    isIcon: false,
  },
});

type ButtonVariants = VariantProps<typeof button>;

interface ButtonProps extends ButtonVariants {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button = ({children, onClick, ...props}: ButtonProps) => {
  return (
    <button onClick={onClick} className={button(props)}>
      {children}
    </button>
  );
};

export default Button;
