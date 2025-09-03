import {useState} from 'react';
import {Chevrondown} from '@/assets/svg';

type LabeledInputProps = {
  label: string;
  className?: string;
  variant?: 'input' | 'dropdown';
  options?: {value: string; label: string}[];
} & React.InputHTMLAttributes<HTMLInputElement>;

const LabeledInput = ({
  label,
  className,
  variant = 'input',
  options = [
    {value: 'public', label: '공개'},
    {value: 'private', label: '비공개'},
  ],
  ...rest
}: LabeledInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  return (
    <label className='flex flex-col gap-3'>
      <span className='font-medium text-base text-black leading-[150%]'>
        {label}
      </span>

      {variant === 'input' ? (
        <input
          className={`h-11 rounded-[9px] border border-purple-stroke px-[14px] outline-none focus:border-primary ${
            className ?? ''
          }`}
          {...rest}
        />
      ) : (
        <div className='relative'>
          <button
            type='button'
            className={`h-11 rounded-[9px] border border-purple-stroke px-[14px] outline-none focus:border-primary flex justify-between items-center w-full text-left ${
              className ?? ''
            }`}
            onClick={() => setIsOpen(!isOpen)}>
            <span className={selectedValue ? 'text-black' : 'text-gray-400'}>
              {selectedValue
                ? options.find((opt) => opt.value === selectedValue)?.label
                : '선택하세요'}
            </span>
            <Chevrondown className='w-[13.5px]' />
          </button>
          {isOpen && (
            <div className='absolute top-full left-0 w-full border border-purple-stroke rounded-[9px] bg-white mt-1 z-10'>
              {options.map((option) => (
                <div
                  key={option.value}
                  role='option'
                  className='px-[14px] py-2 hover:bg-gray-100 cursor-pointer'
                  onClick={() => {
                    setSelectedValue(option.value);
                    setIsOpen(false);
                  }}>
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </label>
  );
};

export default LabeledInput;
