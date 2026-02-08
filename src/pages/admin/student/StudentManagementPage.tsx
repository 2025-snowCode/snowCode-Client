import AssignmentFormLayout from '@/components/admin/assignments/AssignmentFormLayout';
import Search from '@/assets/svg/search.svg?react';
import {useForm} from 'react-hook-form';
import {Pagination} from '@/shared/ui/pagination/pagination';
import {useState} from 'react';
import Input from '@/components/common/Input';
import {StudentTable} from '@/entities/student/ui/StudentTable';
import mockCourseStudents from '@/entities/student/model/mock';

export default function StudentManagementPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const {register} = useForm();

  const {response} = mockCourseStudents;

  const titleExtra = (
    <div className='flex justify-between items-center flex-1'>
      <button className=' text-primary px-3 py-[6px] rounded-4xl inline-flex h-8 justify-center items-center border border-primary'>
        {response.title} ({response.section})
      </button>
      <Input
        type='text'
        placeholder='학번을 검색하세요'
        label='학번 검색'
        icon={<Search className='w-4 h-4' />}
        {...register('studentSearch')}
      />
    </div>
  );

  return (
    <div className='flex flex-col items-center gap-6'>
      <AssignmentFormLayout
        title='학생 관리'
        titleExtra={titleExtra}
        content={<StudentTable students={response.students} />}
        onCancel={() => {}}
        onConfirm={() => {}}
        cancelLabel='삭제'
        confirmLabel='등록'
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
