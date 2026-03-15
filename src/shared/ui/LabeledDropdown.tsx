import Chevrondown from '@/assets/svg/chevrondown.svg?react';
import Dropdown from '@/shared/ui/Dropdown';

interface LabeledDropdownProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect'> {
  label?: string;
  className?: string;
  options: string[];
  placeholder?: string;
  value?: string;
  onSelect?: (value: string) => void;
  errorMessage?: string;
}

const LabeledDropdown = ({
  label,
  className,
  options,
  placeholder,
  value,
  onSelect,
  errorMessage,
  ...rest
}: LabeledDropdownProps) => {
  const handleSelect = (option: string) => {
    onSelect?.(option);
  };

  const TriggerButton = (
    <button
      type='button'
      className={`relative h-11 w-full rounded-[9px] border px-[14px] pr-10 text-left outline-none focus:border-primary ${
        errorMessage ? 'border-badge-red' : 'border-purple-stroke'
      } ${className ?? ''}`}
      {...rest}>
      <span className={value ? 'text-black' : 'text-light-black'}>
        {value || placeholder}
      </span>
      <Chevrondown className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4' />
    </button>
  );

  return (
    <label className='flex flex-col gap-3'>
      <span className='font-medium text-base leading-[150%]'>{label}</span>

      <Dropdown
        dropDownButton={TriggerButton}
        options={options}
        onSelect={handleSelect}
        className='relative'
        menuClassName='w-full bg-gray mt-1'
      />

      {errorMessage && (
        <span className='text-sm text-badge-red'>{errorMessage}</span>
      )}
    </label>
  );
};

export default LabeledDropdown;
