import SurfaceCard from '@/components/common/SurfaceCard';
import CourseSelector from './ui/CourseSelector';
import Button from '@/components/common/Button';

interface AssignmentPageLayoutProps {
  title: string;
  list: React.ReactNode;
  courseOptions: string[];
  onCourseSelect: (value: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
}

const AssignmentPageLayout = ({
  title,
  list,
  courseOptions,
  onCourseSelect,
  onCancel,
  onConfirm,
}: AssignmentPageLayoutProps) => {
  return (
    <SurfaceCard size='large' className='mx-auto flex flex-col *:px-14.5'>
      {/* 상단 영역  */}
      <header className='flex flex-col gap-4 justify-start pt-9.5 pb-5.5 border-b border-purple-stroke'>
        <h1 className='text-primary-black text-2xl/9 font-semibold'>{title}</h1>
        <CourseSelector options={courseOptions} onSelect={onCourseSelect} />
      </header>

      {/* 문제 목록 영역 */}
      <main className='pt-10'>{list}</main>

      {/* 하단 버튼 */}
      <footer className='mb-8.5 mt-auto'>
        <div className='flex justify-end gap-5'>
          <Button color='outlinePurple' onClick={onCancel}>
            취소
          </Button>
          <Button color='primary' onClick={onConfirm}>
            등록
          </Button>
        </div>
      </footer>
    </SurfaceCard>
  );
};

export default AssignmentPageLayout;
