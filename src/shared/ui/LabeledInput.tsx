import {forwardRef} from 'react';

interface LabeledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  showLabel?: boolean;
  errorMessage?: string;
}

const LabeledInput = forwardRef<HTMLInputElement, LabeledInputProps>(
  (
    {
      label,
      className,
      showLabel = true,
      errorMessage,
      required = true,
      ...rest
    },
    ref
  ) => {
    return (
      <label className='flex flex-col gap-3'>
        <span
          className={`font-medium text-base leading-[150%] ${
            showLabel ? '' : 'sr-only'
          }`}>
          {label}
          {required && <span className='text-badge-red'> *</span>}
        </span>

        <input
          ref={ref}
          className={`h-11 rounded-[9px] border px-3.5 outline-none focus:border-primary ${
            errorMessage ? 'border-badge-red' : 'border-purple-stroke'
          } ${className ?? ''}`}
          {...rest}
        />

        {errorMessage && (
          <span className='text-sm text-badge-red'>{errorMessage}</span>
        )}
      </label>
    );
  }
);

LabeledInput.displayName = 'LabeledInput';

export default LabeledInput;
