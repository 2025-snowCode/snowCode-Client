import {twMerge} from 'tailwind-merge';
import {buttonStyles, type ButtonVariants} from './button-styles';

interface ButtonProps extends ButtonVariants {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  formID?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  formID,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      form={formID}
      className={twMerge(buttonStyles(props), className)}>
      {children}
    </button>
  );
};

export default Button;
