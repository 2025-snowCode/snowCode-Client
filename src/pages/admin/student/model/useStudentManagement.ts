import {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {studentQueries} from '@/entities/student/api/studentQueries';
import {studentMutations} from '@/entities/student/api/studentMutations';
import {useToastStore} from '@/shared/model/useToastStore';
import {handleApiError} from '@/shared/lib/handleApiError';

export const useStudentManagement = (courseId: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const {register, watch} = useForm<{studentSearch: string}>();
  const queryClient = useQueryClient();
  const {showToast} = useToastStore();
  const searchValue = watch('studentSearch');

  useEffect(() => {
    setCurrentPage(1);
    setSelectedIds(new Set());
  }, [searchValue]);

  const {data, isLoading} = useQuery(
    studentQueries.getEnrollments(courseId, {
      page: 0,
      pageSize: 1000,
      studentId: searchValue || undefined,
    })
  );

  const {mutate: deleteEnrollments, isPending: isDeletePending} = useMutation({
    ...studentMutations.deleteEnrollmentsBulk(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['enrollments', courseId],
      });
      setSelectedIds(new Set());
      showToast('선택한 학생이 삭제되었습니다.');
    },
    onError: (error) => handleApiError(error, '학생 삭제에 실패했습니다.'),
  });

  const handleDelete = () => {
    if (selectedIds.size === 0) {
      alert('삭제할 학생을 선택해주세요.');
      return;
    }

    if (confirm(`정말 선택한 ${selectedIds.size}명의 학생을 삭제하시겠습니까?`)) {
      deleteEnrollments(Array.from(selectedIds));
    }
  };

  const pageSize = 10;
  const paginatedStudents =
    data?.students.slice((currentPage - 1) * pageSize, currentPage * pageSize) ??
    [];

  return {
    students: data?.students ?? [],
    paginatedStudents,
    title: data?.title,
    section: data?.section,
    currentPage,
    setCurrentPage,
    selectedIds,
    setSelectedIds,
    register,
    handleDelete,
    isDeletePending,
    isLoading,
    totalItems: data?.students.length ?? 0,
    pageSize,
  };
};
