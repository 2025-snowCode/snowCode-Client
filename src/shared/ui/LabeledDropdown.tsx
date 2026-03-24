import {useState} from 'react';
import Chevrondown from '@/assets/svg/chevrondown.svg?react';
import Dropdown from '@/shared/ui/Dropdown';

interface LabeledDropdownProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect'> {
  label?: string;
  className?: string;
  options: string[];
  placeholder?: string;
  onSelect?: (value: string) => void;
}

const LabeledDropdown = ({
  label,
  className,
  options,
  placeholder,
  onSelect,
  ...rest
}: LabeledDropdownProps) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelect = (option: string) => {
    setSelectedValue(option);
    onSelect?.(option);
  };

  const TriggerButton = (
    <button
      type='button'
      className={`relative h-11 w-full rounded-[9px] border border-purple-stroke px-[14px] pr-10 text-left outline-none focus:border-primary ${
        className ?? ''
      }`}
      {...rest}>
      <span className={selectedValue ? 'text-black' : 'text-light-black'}>
        {selectedValue || placeholder}
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
    </label>
  );
};

export default LabeledDropdown;
