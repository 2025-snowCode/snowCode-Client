import {useState, type KeyboardEvent} from 'react';
import {twMerge} from 'tailwind-merge';
import DeleteIcon from '@/assets/svg/deleteIcon.svg?react';

interface MultiSelectInputProps {
  label: string;
  placeholder?: string;
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
  errorMessage?: string;
}

const MultiSelectInput = ({
  label,
  placeholder = '입력하세요',
  value,
  onChange,
  className,
  errorMessage,
}: MultiSelectInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const addTags = (text: string) => {
    const rawTags = text.split(/[ ,]+/);
    const newTags = rawTags
      .map((tag) => tag.trim())
      .filter((tag) => tag !== '' && !value.includes(tag));

    if (newTags.length > 0) {
      onChange([...value, ...newTags]);
    }
    
    setInputValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // 한글 입력 중(IME)일 때는 처리를 스킵하여 중복 입력을 방지
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      addTags(inputValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    
    // 마지막 문자가 공백이나 쉼표인 경우 (단, IME 입력 중이 아닐 때)
    if (val.endsWith(' ') || val.endsWith(',')) {
      addTags(val);
    } else {
      setInputValue(val);
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className={twMerge('flex flex-col gap-3', className)}>
      <label className='font-medium text-base leading-[150%] text-black'>
        {label}
      </label>

      <div className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder={placeholder || '학번을 입력하세요 (공백/쉼표 구분)'}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={twMerge(
            'bg-white h-11 rounded-[9px] border px-3.5 outline-none focus:border-primary',
            errorMessage ? 'border-badge-red' : 'border-purple-stroke'
          )}
        />

        {value.length > 0 && (
          <div className='flex flex-wrap gap-2.5'>
            {value.map((tag) => (
              <div
                key={tag}
                className='flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary text-primary text-sm font-medium'>
                <span>{tag}</span>
                <button
                  type='button'
                  onClick={() => removeTag(tag)}
                  className='flex-center hover:opacity-70 transition-opacity cursor-pointer'>
                  <DeleteIcon width={10} height={10} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {errorMessage && (
        <span role='alert' className='text-sm text-badge-red'>
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default MultiSelectInput;
