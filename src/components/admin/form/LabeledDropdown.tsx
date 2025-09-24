import {useState, useRef} from 'react';
import {Chevrondown} from '@/assets/svg';
import useClickOutside from '@/hooks/useClickOutside';

interface LabeledDropdownProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect'> {
  label: string;
  className?: string;
  variant: 'visibility' | 'year' | 'semester';
  placeholder?: string;
  onSelect?: (value: string) => void;
}

const getDefaultOptions = (variant: 'visibility' | 'year' | 'semester') => {
  switch (variant) {
    case 'visibility':
      return ['공개', '비공개'];
    case 'year':
      return ['2021', '2022', '2023', '2024', '2025'];
    case 'semester':
      return ['1학기', '2학기', '여름학기', '겨울학기'];
    default:
      return [];
  }
};

const LabeledDropdown = ({
  label,
  className,
  variant,
  placeholder,
  onSelect,
  ...rest
}: LabeledDropdownProps) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const optionsToUse = getDefaultOptions(variant);

  useClickOutside({
    ref: dropdownRef,
    onClickOutside: () => setIsOpen(false),
  });

  const handleSelect = (option: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedValue(option);
    setIsOpen(false);
    onSelect?.(option);
  };

  return (
    <label className='flex flex-col gap-3'>
      <span className='font-medium text-base leading-[150%]'>{label}</span>

      <div className='relative' ref={dropdownRef}>
        <button
          type='button'
          className={`relative h-11 w-full rounded-[9px] border border-purple-stroke px-[14px] pr-10 text-left outline-none focus:border-primary ${
            className ?? ''
          }`}
          onClick={() => setIsOpen(!isOpen)}
          {...rest}>
          <span className={selectedValue ? 'text-black' : 'text-light-black'}>
            {selectedValue || placeholder}
          </span>
          <Chevrondown className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4' />
        </button>

        {isOpen && (
          <ul className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-purple-stroke bg-white shadow-lg'>
            {optionsToUse.map((option) => (
              <li
                key={option}
                className='cursor-pointer px-4 py-2 hover:bg-gray-100'
                onClick={(e) => handleSelect(option, e)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </label>
  );
};

export default LabeledDropdown;
