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
  return (
    <div>
      <h3 className='text-lg/[27px] font-medium mb-4'>{title}</h3>
      <ul className='w-full flex flex-col pr-6 h-96 pb-5 overflow-y-auto gap-2.5'>
        {items.map((item) => (
          <li onClick={() => onSelect(item.id)} key={item.id}>
            {renderItem(item)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentListContainer;
