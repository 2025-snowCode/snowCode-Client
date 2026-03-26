import {useState} from 'react';
import EllipsisIcon from '@/assets/svg/ellipsisIcon.svg?react';
import Dropdown from '@/shared/ui/Dropdown';
import ConfirmModal from '@/shared/ui/ConfirmModal';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '@/shared/config/routes';
import {useDeleteCourse} from '@/features/course/delete-course/model/useDeleteCourse';
import {useToastStore} from '@/shared/model/useToastStore';

interface CourseManagementDropdownProps {
  courseId: number;
}

const COURSE_MENU_OPTIONS = ['수정하기', '삭제하기'];

const CourseManagementDropdown = ({
  courseId,
}: CourseManagementDropdownProps) => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const {handleDelete, isPending} = useDeleteCourse(courseId, () => {
    setIsDeleteModalOpen(false);
  });

  // 드롭다운 메뉴 옵션 선택 핸들러
  const handleSelect = (option: string) => {
    const actions: Record<string, () => void> = {
      수정하기: () => navigate(ROUTES.ADMIN.COURSES.EDIT(courseId)),
      삭제하기: () => setIsDeleteModalOpen(true),
    };

    actions[option]?.();
  };

  // 강의 관리 드롭다운 메뉴 트리거
  const CourseMenuTrigger = (
    <div className='cursor-pointer p-2'>
      <EllipsisIcon className='w-[21.2px] h-1.25' />
    </div>
  );

  return (
    <>
      <Dropdown
        options={COURSE_MENU_OPTIONS}
        dropDownButton={CourseMenuTrigger}
        onSelect={handleSelect}
        className='absolute -right-2 -top-6'
        menuClassName='w-36.5 -right-4 bg-white'
      />
      {isDeleteModalOpen && (
        <ConfirmModal
          title='강의를 삭제하시겠습니까?'
          description='삭제 시 관련 단원이 함께 삭제됩니다.'
          confirmLabel={isPending ? '삭제 중...' : '삭제'}
          onConfirm={() => {
            if (isPending) return;
            handleDelete();
          }}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </>
  );
};

export default CourseManagementDropdown;
