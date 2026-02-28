import {ListRowStyles, type ListRowVariants} from './list-row-styles';
import type {ReactNode} from 'react';

interface ListRowProps extends ListRowVariants {
  selected?: boolean;
  leftIcon?: ReactNode;
  title: string;
  rightIcon?: ReactNode;
  className?: string;
}

const ListRow = ({
  selected = false,
  leftIcon,
  title,
  rightIcon,
  className,
}: ListRowProps) => {
  return (
    <div className={ListRowStyles({selected, className})}>
      <div>{leftIcon}</div>
      <p className='text-base/6 font-normal'>{title}</p>
      <div className='ml-auto'>{rightIcon}</div>
    </div>
  );
};

export default ListRow;
