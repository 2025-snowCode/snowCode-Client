import {forwardRef, type InputHTMLAttributes} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({label, error, className, ...props}, ref) => {
    return (
      <div className={`flex flex-col ${className || ''}`}>
        <label className='text-md font-regular'>{label}</label>
        <input
          ref={ref}
          className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
            error ? 'border-badge-red' : 'border-purple-stroke'
          }`}
          {...props}
        />
        {error && <span className='mt-1 text-sm text-badge-red'>{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
