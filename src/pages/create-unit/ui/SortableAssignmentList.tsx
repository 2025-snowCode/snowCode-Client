import SelectableItem from '@/components/common/SelectableItem';
import type {Assignment} from '@/models/assignment';
import {useState} from 'react';
import DragAndDropIcon from '@/assets/svg/dragAndDropIcon.svg?react';
import DeleteIcon from '@/assets/svg/deleteIcon.svg?react';
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import Button from '@/components/common/Button';
import AddIcon from '@/assets/svg/addIcon.svg?react';

export const SortableAssignmentList = ({
  assignmentList,
}: {
  assignmentList: Assignment[];
}) => {
  const [assignments, setAssignments] = useState<Assignment[]>(assignmentList);

  // 과제 인덱스 찾기
  const getAssignmentIndex = (id: number) => {
    return assignments.findIndex((assignment) => assignment.id === id);
  };

  const handleDragEnd = (event: any) => {
    // active: 드래그 중인 아이템, over: 드래그가 끝난 위치의 아이템
    const {active, over} = event;

    if (active.id === over.id) return; // 위치가 바뀌지 않은 경우

    // 위치가 바뀐 경우 - 배열에서 아이템의 위치를 업데이트
    setAssignments((assignments) => {
      const originalIndex = getAssignmentIndex(active.id);
      const newIndex = getAssignmentIndex(over.id);

      return arrayMove(assignments, originalIndex, newIndex);
    });
  };

  const sensors = useSensors(
    // 마우스 및 터치 센서 설정
    useSensor(PointerSensor, {
      activationConstraint: {distance: 8},
    }),

    // 키보드 센서 설정
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div>
      {/* 섹션 제목 - 문제 등록 */}
      <h4 className='text-base/6 font-medium'>문제 등록</h4>

      {/* draggable & sortable 문제 목록 영역 */}
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}>
        <SortableContext
          items={assignments}
          strategy={verticalListSortingStrategy}>
          <ul className='flex flex-col gap-3 mt-3'>
            {assignments.map(({id, title}) => (
              <DraggableAssignmentItem key={id} id={id} title={title} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      {/* 문제 연결 버튼 */}
      <div className='mt-3.5'>
        <Button color='tonal' size='compact' content='mixed'>
          <AddIcon className='w-3 h-3' />
          문제 연결
        </Button>
      </div>
    </div>
  );
};

// 드래그 가능한 과제 아이템 컴포넌트
const DraggableAssignmentItem = ({id, title}: Assignment) => {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} =
    useSortable({id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <SelectableItem
        title={title}
        leftIcon={<DragAndDropIcon />}
        rightIcon={<DeleteIcon className='w-3 h-3' />}
        className={`cursor grab touch-none bg-white shadow-box active:cursor-grabbing ${isDragging ? 'z-10 opacity-50' : ''}`}
      />
    </li>
  );
};
