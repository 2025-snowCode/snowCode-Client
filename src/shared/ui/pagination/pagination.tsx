import ChevronDown from '@/assets/svg/chevrondown.svg?react';
import {tv} from 'tailwind-variants';

interface PaginationProps {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const paginationButton = tv({
  base: 'cursor-pointer p-2 transition-all flex items-center justify-center min-w-[32px] font-medium rounded-md',
  variants: {
    active: {
      true: 'text-primary',
      false: 'text-black-light hover:text-primary',
    },
    disabled: {
      true: 'cursor-default opacity-20 hover:text-inherit',
    },
  },
});

export const Pagination = ({
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (pageSize <= 0 || totalPages === 0) {
    return null;
  }

  return (
    <div className='flex items-center gap-4'>
      <button
        type='button'
        aria-label='이전 페이지'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={paginationButton({disabled: currentPage === 1})}
      >
        <ChevronDown className='rotate-90 w-2 h-4' />
      </button>

      <div className='flex items-center gap-1'>
        {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
          <button
            type='button'
            key={page}
            aria-current={currentPage === page ? 'page' : undefined}
            onClick={() => onPageChange(page)}
            className={paginationButton({active: currentPage === page})}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type='button'
        aria-label='다음 페이지'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={paginationButton({disabled: currentPage === totalPages})}
      >
        <ChevronDown className='-rotate-90 w-2 h-4' />
      </button>
    </div>
  );
};
