import {forwardRef, useId} from 'react';
import {twMerge} from 'tailwind-merge';

interface LabeledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  showLabel?: boolean;
  errorMessage?: string;
  id?: string;
}

const LabeledInput = forwardRef<HTMLInputElement, LabeledInputProps>(
  (
    {
      label,
      className,
      showLabel = true,
      errorMessage,
      required = true,
      id,
      ...rest
    },
    ref
  ) => {
    const fallbackId = useId();
    const inputId = id ?? fallbackId;
    const errorId = `${inputId}-error`;

    return (
      <div className='flex flex-col gap-3'>
        <label
          htmlFor={inputId}
          className={twMerge(
            'font-medium text-base leading-[150%] flex-row gap-1',
            !showLabel && 'sr-only'
          )}>
          {label}
          {required && <span className='text-badge-red'> *</span>}
        </label>

        <input
          id={inputId}
          ref={ref}
          aria-invalid={Boolean(errorMessage)}
          aria-describedby={errorMessage ? errorId : undefined}
          className={twMerge(
            'bg-white h-11 rounded-[9px] border px-3.5 outline-none focus:border-primary',
            errorMessage ? 'border-badge-red' : 'border-purple-stroke',
            className
          )}
          {...rest}
        />

        {errorMessage && (
          <span id={errorId} role='alert' className='text-sm text-badge-red'>
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);

LabeledInput.displayName = 'LabeledInput';

export default LabeledInput;
