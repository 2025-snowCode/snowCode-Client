import {useState} from 'react';
import {
  SingleEllipsisIcon,
  DragAndDropIcon,
  DeleteIcon,
  EditIcon,
} from '../../../assets/svg';
import type {Assignment} from './dummy/types';

interface AssignmentCardProps extends Assignment {
  select?: boolean;
  onLinkAssignments?: (id: number, title: string, isSelected: boolean) => void;
}

const AssignmentCard = ({
  id,
  title,
  select,
  onLinkAssignments,
}: AssignmentCardProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const handleOnClick = () => {
    const selectedState = !isSelected;
    setIsSelected(selectedState);
    onLinkAssignments?.(id, title, selectedState);
  };

  return (
    <div
      onClick={handleOnClick}
      className={`bg-background w-[612px] py-4 rounded-[9px] my-1 flex items-center justify-between px-[21.5px] ${
        isSelected ? 'border-1 border-primary' : 'border-1 border-background'
      }`}>
      <div className='flex-center gap-4 cursor-pointer '>
        {select ? (
          <SingleEllipsisIcon
            width={12}
            height={12}
            stroke={isSelected ? '#856cff' : '#ffffff'}
          />
        ) : (
          <DragAndDropIcon width={8} height={13} />
        )}
        <div>{title}</div>
      </div>
      {!select && (
        <div className='flex-center gap-6 cursor-pointer'>
          <EditIcon width={14} height={16} />
          <DeleteIcon width={12} height={12} />
        </div>
      )}
    </div>
  );
};

export default AssignmentCard;
