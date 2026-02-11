import EllipsisIcon from '@/assets/svg/ellipsisIcon.svg?react';
import Dropdown from '@/components/common/Dropdown';
import {useNavigate} from 'react-router-dom';

const COURSE_MENU_OPTIONS = ['수정하기', '삭제하기'];

const CourseManagementDropdown = ({courseId}: {courseId: number}) => {
  const navigate = useNavigate();

  // 드롭다운 메뉴 옵션 선택 핸들러
  const handleSelect = (option: string) => {
    const actions: Record<string, () => void> = {
      수정하기: () => navigate('courses/create'), // 강의 생성 페이지 임시 연결
      삭제하기: () => console.log(`강의 ${courseId} 삭제`),
    };

    actions[option]?.();
  };

  // 강의 관리 드롭다운 메뉴 트리거
  const CourseMenuTrigger = (
    <div className='cursor-pointer p-2'>
      <EllipsisIcon className='w-[21.2px] h-[5px]' />
    </div>
  );

  return (
    <Dropdown
      options={COURSE_MENU_OPTIONS}
      dropDownButton={CourseMenuTrigger}
      onSelect={handleSelect}
      className='absolute -right-2 -top-6'
      menuClassName='w-36.5 -right-4 bg-white'
    />
  );
};

export default CourseManagementDropdown;
