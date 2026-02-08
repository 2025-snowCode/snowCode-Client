import type {AssignmentSelectCourse} from '@/models/course';

type T = AssignmentSelectCourse['assignments'][number];

interface AssignmentListContainerProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  title: string;
  onSelect: (id: number) => void;
}

const AssignmentListContainer = ({
  onSelect,
  items,
  renderItem,
  title,
}: AssignmentListContainerProps<T>) => {
  const handleSelect = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    onSelect(id);
  };
  return (
    <div className='custom-scrollbar'>
      <h3 className='text-lg/[27px] font-medium mb-4'>{title}</h3>
      <ul className='w-full flex flex-col pr-4 h-96 pb-5 overflow-y-auto gap-2.5'>
        {items.map((item) => (
          <li onClick={(e) => handleSelect(item.id, e)} key={item.id}>
            {renderItem(item)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentListContainer;
