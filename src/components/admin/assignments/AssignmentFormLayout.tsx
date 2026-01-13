import Button from '@/components/common/Button';

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
    <div>
      <div className='mx-auto w-[900px] bg-white rounded-[30px] flex flex-col min-h-[600px] pt-9 pb-8 pl-[56px] pr-[32px]'>
        {/* 제목 */}
        <div className='flex items-center gap-3'>
          <h2 className='text-black text-[24px] font-semibold'>{title}</h2>
          {titleExtra}
        </div>

        {/* 본문 */}
        <div className='flex-1 mt-7'>{content}</div>

        {/* 하단 버튼 */}
        <div className='mt-auto flex justify-end gap-[21px]'>
          <Button color='outlinePurple' onClick={onCancel}>
            취소
          </Button>
          <Button color='primary' onClick={onConfirm}>
            저장
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentFormLayout;
