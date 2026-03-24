import AssignmentFormLayout from '@/widgets/assignment-form-layout/ui/AssignmentFormLayout';
import Search from '@/assets/svg/search.svg?react';
import {useForm} from 'react-hook-form';
import {Pagination} from '@/shared/ui/pagination/pagination';
import {useState} from 'react';
import Input from '@/shared/ui/Input';
import {StudentTable} from '@/entities/student/ui/StudentTable';
import {useParams} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import {studentQueries} from '@/entities/student/api/studentQueries';
import {AddStudentPopover} from '@/entities/student/ui/AddStudentPopover';

export default function StudentManagementPage() {
  const {courseId} = useParams<{courseId: string}>();
  const [currentPage, setCurrentPage] = useState(1);
  const {register, watch} = useForm<{studentSearch: string}>();
  const searchValue = watch('studentSearch');

  const {data} = useQuery(
    studentQueries.getEnrollments(Number(courseId), {
      page: currentPage - 1,
      pageSize: 10,
      studentId: searchValue || undefined,
    })
  );

  const titleExtra = (
    <div className='flex justify-between items-center flex-1'>
      <button className=' text-primary px-3 py-[6px] rounded-4xl inline-flex h-8 justify-center items-center border border-primary'>
        {data?.title} ({data?.section})
      </button>
      <div className='flex gap-6'>
        <AddStudentPopover courseId={Number(courseId)} />
        <Input
          type='text'
          placeholder='학번을 검색하세요'
          icon={<Search className='w-4 h-4' />}
          {...register('studentSearch')}
        />
      </div>
    </div>
  );

  return (
    <div className='flex flex-col items-center gap-6'>
      <AssignmentFormLayout
        title='학생 관리'
        titleExtra={titleExtra}
        content={
          <StudentTable
            students={data?.students ?? []}
            courseId={Number(courseId)}
          />
        }
        onCancel={() => {}}
        onConfirm={() => {}}
        cancelLabel='삭제'
        confirmLabel='등록'
      />
      <Pagination
        totalItems={data?.studentCount ?? 0}
        pageSize={10}
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />
    </div>
  );
}
