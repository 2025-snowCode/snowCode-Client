import {useEffect} from 'react';
import Button from '@/shared/ui/button/Button';

interface ConfirmModalProps {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  title,
  description,
  confirmLabel = '확인',
  cancelLabel = '취소',
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onCancel]);

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'
      onClick={onCancel}>
      <section
        role='dialog'
        aria-modal='true'
        aria-labelledby='confirm-modal-title'
        className='bg-white rounded-2xl p-8 w-80 flex flex-col gap-6 shadow-lg'
        onClick={(e) => e.stopPropagation()}>
        <div className='flex flex-col gap-2'>
          <h2 id='confirm-modal-title' className='text-lg font-semibold text-primary-black'>
            {title}
          </h2>
          {description && (
            <p className='text-sm text-secondary-black'>{description}</p>
          )}
        </div>
        <div className='flex gap-3 justify-center'>
          <Button color='secondary' onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button color='primary' onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </section>
    </div>
  );
}
