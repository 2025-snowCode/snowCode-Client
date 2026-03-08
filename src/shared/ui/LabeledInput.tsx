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
        required={required}
        className={`h-11 rounded-[9px] bg-white border border-purple-stroke px-[14px] outline-none focus:border-primary ${
          className ?? ''
        }`}
        {...rest}
      />
      <p className='text-xs text-badge-red min-h-4'>{errorMessage}</p>
    </label>
  );
};

export default LabeledInput;
