import {DragAndDropIcon, DeleteIcon, EditIcon} from '../../../assets/svg';
import type {Assignment} from './dummy/types';

interface AssignmentCardProps extends Assignment {}

const AssignmentCard = ({title}: AssignmentCardProps) => {
  return (
    <div className='bg-background w-[612px] py-4 rounded-[9px] my-1 flex items-center justify-between px-[21.5px]'>
      <div className='flex-center gap-4'>
        <DragAndDropIcon width={8} height={13} />
        <div>{title}</div>
      </div>
      <div className='flex-center gap-6 cursor-pointer'>
        <EditIcon width={14} height={16} />
        <DeleteIcon width={12} height={12} />
      </div>
    </div>
  );
};

export default AssignmentCard;
