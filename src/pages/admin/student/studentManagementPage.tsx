import AssignmentFormLayout from '@/components/admin/assignments/AssignmentFormLayout';
import Search from '@/assets/svg/search.svg?react';
import {useSearchParams} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import Pagination from '@/shared/ui/pagination/pagination';
import {useState} from 'react';
import Input from '@/components/common/Input';

export default function StudentManagementPage() {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const course = searchParams.get('course');
  const {register} = useForm();

  const titleExtra = (
    <div className='flex justify-between items-center flex-1'>
      <button className=' text-primary px-3 py-[6px] rounded-4xl inline-flex h-8 justify-center items-center border border-primary'>
        {course || '전체'}
      </button>
      <Input
        type='text'
        placeholder='학번을 검색하세요'
        icon={<Search className='w-4 h-4' />}
        className='w-64'
        {...register('studentSearch')}
      />
    </div>
  );

  return (
    <div className='flex flex-col items-center gap-6'>
      <AssignmentFormLayout
        title='학생 관리'
        titleExtra={titleExtra}
        content={<div>학생 관리 기능이 여기에 들어갑니다.</div>}
        onCancel={() => {}}
        onConfirm={() => {}}
      />
      <Pagination
        totalItems={100}
        pageSize={10}
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />
    </div>
  );
}
