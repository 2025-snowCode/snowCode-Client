import Button from '@/shared/ui/button/Button';
import BinIcon from '@/assets/svg/binIcon.svg?react';
import ConfirmModal from '@/shared/ui/ConfirmModal';
import {useState} from 'react';

interface UnitFormLayoutProps {
  unitNumber: number;
  onDelete?: () => void;
  onSave: () => void;
  onCancel: () => void;
  isPending?: boolean;
  children: React.ReactNode;
}

const UnitFormLayout = ({
  unitNumber,
  onDelete,
  onSave,
  onCancel,
  isPending,
  children,
}: UnitFormLayoutProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <div className='flex flex-col w-full h-full p-5'>
        <div className='bg-background h-167.5 flex flex-col overflow-x-hidden custom-scrollbar rounded-[30px]'>
          <div className='bg-[#EDE9FF] flex justify-between items-center px-7.5 py-4'>
            <h3 className='text-lg font-medium'>{unitNumber}. 단원</h3>
            <Button
              onClick={() => setIsDeleteModalOpen(true)}
              color='primary'
              content='icon'
              size='none'
              className={`${!onDelete ? 'invisible' : ''} w-9 h-9 rounded-full`}>
              <BinIcon className='w-4 h-4' />
            </Button>
          </div>
          {children}
        </div>

        {/* 제출 버튼 */}
        <div className='mt-6 mb-2 flex justify-end gap-5.5'>
          <Button onClick={onCancel} color='outlinePurple'>
            취소
          </Button>
          <Button onClick={onSave} disabled={isPending}>
            {isPending ? '저장 중...' : '저장'}
          </Button>
        </div>
      </div>

      {isDeleteModalOpen && (
        <ConfirmModal
          title='단원을 삭제하시겠습니까?'
          description='삭제된 단원은 복구할 수 없습니다.'
          confirmLabel='삭제'
          cancelLabel='취소'
          onConfirm={() => onDelete?.()}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </>
  );
};

export default UnitFormLayout;
