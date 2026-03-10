interface LabeledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  showLabel?: boolean;
  errorMessage?: string;
}

const LabeledInput = ({
  label,
  className,
  showLabel = true,
  errorMessage,
  required = true,
  ...rest
}: LabeledInputProps) => {
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
        className={`h-11 rounded-[9px] border px-[14px] outline-none focus:border-primary ${
          errorMessage ? 'border-badge-red' : 'border-purple-stroke'
        } ${className ?? ''}`}
        {...rest}
      />

      {errorMessage && (
        <span className='text-sm text-badge-red'>{errorMessage}</span>
      )}
    </label>
  );
};

export default LabeledInput;
