import ChevronDown from '@/assets/svg/chevrondown.svg?react';

interface PaginationProps {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (pageSize <= 0) {
    return null;
  }
  if (totalPages == 0) {
    return null;
  }

  return (
    <div className='flex items-center gap-6'>
      <button
        type='button'
        aria-label='이전 페이지'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}>
        <ChevronDown className='rotate-90 w-2 h-4' />
      </button>

      {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
        <button
          type='button'
          key={page}
          aria-current={currentPage === page ? 'page' : undefined}
          onClick={() => onPageChange(page)}
          className={
            currentPage === page
              ? 'text-primary'
              : 'text-black-light hover:text-primary transition-colors'
          }>
          {page}
        </button>
      ))}
      <button
        type='button'
        aria-label='다음 페이지'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}>
        <ChevronDown className='-rotate-90 w-2 h-4' />
      </button>
    </div>
  );
};
