import EditIcon from '@/assets/svg/editIcon.svg?react';
import DeleteIcon from '@/assets/svg/deleteIcon.svg?react';
import {useNavigate} from 'react-router-dom';

interface AssignmentManageActionsBarProps {
  id: number;
  onDelete: (id: number) => void;
}

const AssignmentManageActionsBar = ({
  id,
  onDelete,
}: AssignmentManageActionsBarProps) => {
  const navigate = useNavigate();

  const handleOnEdit = () => {
    navigate(`/admin/assignments/${id}`);
  };

  const handleOnDelete = () => {
    onDelete(id);
  };

  return (
    <div
      className='flex items-center gap-6 *:cursor-pointer *:p-1'
      onClick={(e) => e.stopPropagation()}>
      <button onClick={handleOnEdit}>
        <EditIcon className='w-3.5 h-4' />
      </button>
      <button onClick={handleOnDelete}>
        <DeleteIcon className='w-3.5 h-4' />
      </button>
    </div>
  );
};

export default AssignmentManageActionsBar;
