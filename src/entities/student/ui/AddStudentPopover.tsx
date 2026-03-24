import {useState, useRef, useEffect} from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import AddIcon from '@/assets/svg/addIcon.svg?react';
import {studentMutations} from '@/entities/student/api/studentMutations';
import {studentQueries} from '@/entities/student/api/studentQueries';

type Props = {
  courseId: number;
};

export function AddStudentPopover({courseId}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');
  const popoverRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const {mutate, isPending} = useMutation({
    ...studentMutations.addEnrollment(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: studentQueries
          .getEnrollments(courseId, {page: 0, pageSize: 10})
          .queryKey.slice(0, 2),
      });

      setStudentId('');
      setError('');
      setIsOpen(false);
    },
    onError: (err: unknown) => {
      const msg = (
        err as {response?: {data?: {response?: {errorMessage?: string}}}}
      ).response?.data?.response?.errorMessage;

      setError(msg ?? '오류가 발생했습니다.');
    },
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setStudentId('');
        setError('');
      }
    };

    if (isOpen) document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!studentId.trim()) {
      setError('학번을 입력해주세요.');
      return;
    }

    mutate(studentId.trim());
  };

  return (
    <div className='relative' ref={popoverRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className='w-9 h-9 rounded-full bg-primary flex items-center justify-center'>
        <AddIcon className='w-4 h-4 text-white' />
      </button>

      {isOpen && (
        <div
          className='absolute z-50 top-12 left-1/2 -translate-x-1/2
          bg-white text-gray-800 rounded-md px-3 py-2
          w-55 shadow-lg border border-gray-100'>
          {/* triangle */}
          <div className='absolute -top-2 left-1/2 -translate-x-1/2'>
            <div className='w-3.5 h-3.5 bg-white border-t border-l border-gray-100 rotate-45' />
          </div>

          <form onSubmit={handleSubmit} className='flex items-center gap-2'>
            <input
              type='text'
              placeholder='학번 입력'
              value={studentId}
              onChange={(e) => {
                setStudentId(e.target.value);
                setError('');
              }}
              autoFocus
              className='flex-1 text-xs outline-none placeholder:text-gray-400'
            />

            <button
              type='submit'
              disabled={isPending}
              className='text-xs font-bold text-primary hover:opacity-70'>
              {isPending ? '등록중...' : '등록'}
            </button>
          </form>

          {error && <p className='mt-1 text-[10px] text-alert'>{error}</p>}
        </div>
      )}
    </div>
  );
}
