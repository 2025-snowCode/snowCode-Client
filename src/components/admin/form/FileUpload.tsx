import {useRef, useState} from 'react';
import type {ChangeEvent} from 'react';
import {File} from '@/assets/svg';

type FileUploadProps = {
  label: string;
  onFileChange: (file: File | null) => void;
  description?: string;
  accept?: string;
  className?: string;
};

export default function FileUpload({
  label,
  onFileChange,
  description = '업로드하기',
  accept = '.csv',
  className,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dragCounter = useRef(0);

  const prevent = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    prevent(e);
    dragCounter.current += 1;
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    prevent(e);
    dragCounter.current -= 1;
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => prevent(e);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    prevent(e);
    dragCounter.current = 0;

    const items = e.dataTransfer?.items;
    if (items && items.length === 0) return;

    const files = Array.from(e.dataTransfer.files || []);
    if (files.length) {
      const file = files[0];
      setSelectedFile(file);
      onFileChange(file);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length) {
      const file = files[0];
      setSelectedFile(file);
      onFileChange(file);
    }
    // 값 초기화(같은 파일 재선택 허용)
    e.target.value = '';
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    onFileChange(null);
  };

  return (
    <div className={`flex flex-col gap-3 ${className ?? ''}`}>
      <span className='font-medium text-base text-black leading-[150%]'>
        {label}
      </span>

      {selectedFile ? (
        <div className='flex items-center justify-between h-11 rounded-[9px] border border-purple-stroke px-[14px] bg-gray-50'>
          <span className='text-sm text-black'>{selectedFile.name}</span>
          <button
            type='button'
            onClick={handleRemoveFile}
            className='text-red-500 hover:text-red-700 text-sm'>
            삭제
          </button>
        </div>
      ) : (
        <div
          tabIndex={0}
          role='button'
          aria-label='파일 업로드 드롭존'
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) =>
            (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()
          }
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={[
            'flex h-[166px] w-full cursor-pointer items-center justify-center rounded-[9px] border-1 border-dashed border-primary bg-background',
            'focus:outline-none focus:ring-2 focus:ring-primary',
          ].join(' ')}>
          <div className='flex flex-col gap-2 items-center'>
            <File className='w-[32px] h-[38px]' />
            <div className='pointer-events-none text-sm text-primary  text-decoration-line: underline'>
              {description}
            </div>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type='file'
        className='hidden'
        accept={accept}
        onChange={handleChange}
      />
    </div>
  );
}
