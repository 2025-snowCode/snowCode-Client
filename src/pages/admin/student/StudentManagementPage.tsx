import {useParams} from 'react-router-dom';
import Search from '@/assets/svg/search.svg?react';
import AssignmentFormLayout from '@/widgets/assignment-form-layout/ui/AssignmentFormLayout';
import {Pagination} from '@/shared/ui/pagination/pagination';
import Input from '@/shared/ui/Input';
import {StudentTable} from '@/entities/student/ui/StudentTable';
import {AddStudentPopover} from '@/entities/student/ui/AddStudentPopover';
import {useStudentManagement} from './model/useStudentManagement';

export default function StudentManagementPage() {
  const {courseId} = useParams<{courseId: string}>();
  const numericCourseId = Number(courseId);

  const {
    paginatedStudents,
    title,
    section,
    currentPage,
    setCurrentPage,
    selectedIds,
    setSelectedIds,
    register,
    handleDelete,
    totalItems,
    pageSize,
  } = useStudentManagement(numericCourseId);

  const titleExtra = (
    <div className='flex justify-between items-center flex-1'>
      <button className=' text-primary px-3 py-[6px] rounded-4xl inline-flex h-8 justify-center items-center border border-primary'>
        {title} ({section})
      </button>
      <div className='flex gap-6'>
        <AddStudentPopover courseId={numericCourseId} />
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
              students={paginatedStudents}
              courseId={numericCourseId}
              selectedIds={selectedIds}
              onSelectionChange={setSelectedIds}
            />
        }
        onCancel={handleDelete}
        onConfirm={() => {}}
        cancelLabel='선택 삭제'
        confirmLabel='확인'
        confirmDisabled={true}
      />
      <Pagination
        totalItems={totalItems}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
