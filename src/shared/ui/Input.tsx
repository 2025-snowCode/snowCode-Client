import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({label, error, icon, className, id, ...props}, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = error ? `${inputId}-error` : undefined;
    return (
      <div className={`flex flex-col ${className || ''}`}>
        {label && (
          <label htmlFor={inputId} className='text-md font-regular'>
            {label}
          </label>
        )}
        <div className='relative'>
          {icon && (
            <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            {...(errorId ? {'aria-describedby': errorId} : {})}
            className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
              icon ? 'pl-10' : ''
            } ${error ? 'border-badge-red' : 'border-purple-stroke'}`}
            {...props}
          />
        </div>
        {error && (
          <span id={errorId} className='mt-1 text-sm text-badge-red'>
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
