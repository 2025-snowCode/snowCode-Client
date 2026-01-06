import AssignmentFormLayout from '@/components/admin/assignments/AssignmentFormLayout';
import Search from '/public/svg/search.svg?react';
import {useSearchParams} from 'react-router-dom';

export default function StudentManagementPage() {
  const [searchParams] = useSearchParams();
  const course = searchParams.get('course');

  const titleExtra = (
    <div className='flex justify-between items-center flex-1'>
      <button className=' text-primary px-3 py-[6px] rounded-4xl inline-flex h-8 justify-center items-center border border-primary'>
        {course || '전체'}
      </button>
      <div className='relative'>
        <input
          type='text'
          placeholder='학번을 검색하세요'
          className='border border-gray-300 rounded-lg px-4 py-2 pr-10 w-64'
        />
        <Search className='absolute right-3 top-3 w-4 h-4 text-gray-400' />
      </div>
    </div>
  );

  return (
    <AssignmentFormLayout
      title='학생 관리'
      titleExtra={titleExtra}
      content={<div>학생 관리 기능이 여기에 들어갑니다.</div>}
      onCancel={() => {}}
      onConfirm={() => {}}
    />
  );
}
