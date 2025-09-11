interface LabeledInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  showLabel?: boolean;
}

const LabeledInput = ({
  label,
  className,
  showLabel = true,
  ...rest
}: LabeledInputProps) => {
  return (
    <label className='flex flex-col gap-3'>
      <span
        className={`font-medium text-base leading-[150%] ${
          showLabel ? '' : 'sr-only'
        }`}>
        {label}
      </span>

      <input
        className={`h-11 rounded-[9px] border border-purple-stroke px-[14px] outline-none focus:border-primary ${
          className ?? ''
        }`}
        {...rest}
      />
    </label>
  );
};

export default LabeledInput;
