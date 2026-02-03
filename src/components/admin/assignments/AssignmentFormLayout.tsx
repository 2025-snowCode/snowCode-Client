import Button from '@/components/common/Button';
import SurfaceCard from '@/components/common/SurfaceCard';

type AssignmentFormLayoutProps = {
  title: string;
  titleExtra?: React.ReactNode;
  content: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
};

const AssignmentFormLayout = ({
  title,
  titleExtra,
  content,
  onCancel,
  onConfirm,
}: AssignmentFormLayoutProps) => {
  return (
    <div className='flex flex-col items-center gap-6'>
      <SurfaceCard
        size='medium'
        className='mx-auto pt-9 pb-8 pl-[56px] pr-[32px] flex flex-col'>
        {/* 제목 */}
        <div className='flex items-center gap-3'>
          <h2 className='text-black text-[24px] font-semibold'>{title}</h2>
          {titleExtra}
        </div>

        {/* 본문 */}
        <div className='flex-1 mt-7'>{content}</div>

        {/* 하단 버튼 */}
        <div className='mt-7 flex justify-end gap-[21px]'>
          <Button color='outlinePurple' onClick={onCancel}>
            취소
          </Button>
          <Button color='primary' onClick={onConfirm}>
            저장
          </Button>
        </div>
      </SurfaceCard>
    </div>
  );
};

export default AssignmentFormLayout;
