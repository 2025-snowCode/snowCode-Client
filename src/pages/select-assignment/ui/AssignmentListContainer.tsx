import type {Assignment} from '@/entities/assignment/model/types';
import type {AssignmentSelectCourse} from '@/entities/course/model/types';
import type {MouseEvent, ReactNode} from 'react';

type T = AssignmentSelectCourse['assignments'][number];

interface AssignmentListContainerProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  title: string;
  onSelect?: (item: Assignment) => void;
}

const AssignmentListContainer = ({
  onSelect,
  items,
  renderItem,
  title,
}: AssignmentListContainerProps<T>) => {
  const handleSelect = (item: Assignment, event: MouseEvent) => {
    event.stopPropagation();
    onSelect?.(item);
  };
  return (
    <div className='custom-scrollbar'>
      <h3 className='text-lg/[27px] font-medium mb-4'>{title}</h3>
      <ul className='w-full flex flex-col pr-4 h-96 pb-5 overflow-y-auto gap-2.5'>
        {items.map((item) => (
          <li onClick={(e) => handleSelect(item, e)} key={item.id}>
            {renderItem(item)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentListContainer;
