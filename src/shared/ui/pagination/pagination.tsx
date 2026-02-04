import ChevronDown from '@/assets/svg/chevrondown.svg?react';

interface PaginationProps {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages == 0) {
    return null;
  }

  return (
    <div className='flex items-center gap-6'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}>
        <ChevronDown className='rotate-90 w-2 h-4' />
      </button>

      {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
        <button
          key={page}
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
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}>
        <ChevronDown className='-rotate-90 w-2 h-4' />
      </button>
    </div>
  );
}
