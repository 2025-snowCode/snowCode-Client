import styles from './Checkbox.module.css';
import type {ChangeEvent, InputHTMLAttributes} from 'react';

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'checked'> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const Checkbox = ({
  checked,
  onChange,
  className = '',
  ...rest
}: CheckboxProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };
  return (
    <input
      type='checkbox'
      checked={checked}
      onChange={handleChange}
      className={`${styles.checkbox} ${className}`}
      {...rest}
    />
  );
};
