import SurfaceCard from '@/shared/ui/SurfaceCard';
import {CourseSelector} from '@/features/course/filter-course';
import type {ReactNode} from 'react';

interface AssignmentPageLayoutProps {
  title: string;
  list: ReactNode;
  buttons: ReactNode;
  courseOptions: string[];
  onCourseSelect: (value: string) => void;
}

export const AssignmentPageLayout = ({
  title,
  list,
  buttons,
  courseOptions,
  onCourseSelect,
}: AssignmentPageLayoutProps) => {
  return (
    <SurfaceCard size='large' className='mx-auto flex flex-col *:px-14.5'>
      {/* 상단 영역  */}
      <div className='flex flex-col gap-4 justify-start pt-9.5 pb-5.5 border-b border-purple-stroke'>
        <h1 className='text-primary-black text-2xl/9 font-semibold'>{title}</h1>
        <CourseSelector options={courseOptions} onSelect={onCourseSelect} />
      </div>

      {/* 문제 목록 영역 */}
      <section className='pt-10'>{list}</section>

      {/* 하단 버튼 영역 */}
      <div className='mb-8.5 mt-auto flex justify-end'>{buttons}</div>
    </SurfaceCard>
  );
};
