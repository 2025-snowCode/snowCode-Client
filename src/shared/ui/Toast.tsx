import CheckIcon from '@/assets/svg/checkIcon.svg?react';
import {useToastStore} from '../model/useToastStore';

const Toast = () => {
  const {isOpen, message} = useToastStore();

  return (
    isOpen && (
      <div
        className='fixed top-10 left-1/2 -translate-x-1/2 z-100 flex-center'
        role='status'
        aria-live='polite'
        aria-atomic='true'>
        <div className='flex items-center gap-3 bg-white p-4 rounded-md shadow-card'>
          <div className='bg-primary/5 p-2 rounded-md'>
            <CheckIcon className='w-4 h-4 text-primary' />
          </div>
          <p className='text-primary font-medium'>{message}</p>
        </div>
      </div>
    )
  );
};

export default Toast;
