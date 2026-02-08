import useClickOutside from '@/hooks/useClickOutside';
import {useRef, useState} from 'react';

interface DropdownProps {
  dropDownButton?: React.ReactNode;
  options: string[];
  onSelect?: (value: string) => void;
  className?: string;
  menuClassName?: string;
}

const Dropdown = ({
  dropDownButton,
  options,
  onSelect,
  className,
  menuClassName,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: dropdownRef,
    onClickOutside: () => setIsOpen(false),
  });

  const handleSelect = (option: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpen(false);
    onSelect?.(option);
  };

  return (
    <div ref={dropdownRef} className={`${className ?? ''}`}>
      <div onClick={() => setIsOpen(!isOpen)}>{dropDownButton}</div>

      {isOpen && (
        <ul
          className={`absolute z-10 mt-2 overflow-auto rounded-[9px] divide-y divide-purple-stroke shadow-dropdown text-left ${menuClassName}`}>
          {options.map((option) => (
            <li
              key={option}
              className='cursor-pointer px-4 py-3 hover:bg-gray-100'
              onClick={(e) => handleSelect(option, e)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
