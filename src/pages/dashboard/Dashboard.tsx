import LogoIcon from '@/assets/images/snowCode_logo.svg?react';
import CourseList from './ui/CourseList';
import Button from '@/components/common/Button';
import AddIcon from '@/assets/svg/addIcon.svg?react';
import ScheduleList from './ui/ScheduleList';
import {Link} from 'react-router-dom';
import {useUserStore} from '@/entities/auth/model/useUserStore';
import courseQueryOptions from '@/entities/course/api/courseQueryOptions';
import {
  useMutation,
  useQueryClient,
  useSuspenseQueries,
} from '@tanstack/react-query';
import assignmentQueryOptions from '@/entities/assignment/api/assignmentQueryOptions';
import {deleteCourse} from '@/entities/course';
import {EmptyState} from '@/components/common/EmptyState';

const Dashboard = () => {
  const userType = useUserStore((state) => state.userType);
  const queryClient = useQueryClient();

  // 강의 및 스케쥴 데이터 패칭
  const [{data: courses}, {data: schedules}] = useSuspenseQueries({
    queries: [courseQueryOptions(), assignmentQueryOptions()],
  });

  // 강의 삭제 뮤테이션
  const {mutate} = useMutation({
    mutationFn: (courseId: number) => deleteCourse(courseId),
    onSuccess: () => {
      // 강의 목록 및 스케쥴 목록 갱신
      queryClient.invalidateQueries({
        queryKey: courseQueryOptions().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: assignmentQueryOptions().queryKey,
      });
      alert('강의가 성공적으로 삭제되었습니다.');
    },
    onError: (error) => {
      console.error('강의 삭제 실패', error);
      alert('강의 삭제에 실패했습니다. 다시 시도해주세요.');
    },
  });

  // 강의 삭제 핸들러
  const handleDeleteCourse = (courseId: number) => {
    if (confirm('강의를 삭제하시겠습니까?')) {
      mutate(courseId);
    }
  };

  return (
    <main className='w-full'>
      <h1 className='font-semibold text-[28px]/normal mb-7'>내 대시보드</h1>
      <div className='flex items-start gap-16'>
        {/* 강의 목록 */}
        <section>
          <div className='flex items-start justify-between'>
            <SectionHeader title='강의 목록' />
            {userType === 'admin' && <AddButton />}
          </div>

          {courses.response.count === 0 ? (
            <EmptyState>등록된 강의가 없습니다.</EmptyState>
          ) : (
            <CourseList
              courseList={courses.response.courses}
              onDelete={handleDeleteCourse}
            />
          )}
        </section>

        {/* 스케쥴 목록 */}
        <section>
          <div className='pl-24.5'>
            <SectionHeader title='내 스케쥴' />
          </div>

          {schedules.response.count === 0 ? (
            <EmptyState className='pl-24.5'>예정된 과제가 없습니다.</EmptyState>
          ) : (
            <ScheduleList scheduleList={schedules.response.schedule} />
          )}
        </section>
      </div>
    </main>
  );
};

const SectionHeader = ({title}: {title: string}) => {
  return (
    <header className='flex items-center gap-2 mb-5'>
      <LogoIcon className='w-8 h-5 shrink-0' />
      <h2 className='text-xl/normal font-medium'>{title}</h2>
    </header>
  );
};

const AddButton = () => {
  return (
    <Link to='courses/create'>
      <Button
        color='ghostWhite'
        size='compact'
        content='mixed'
        className='hover:opacity-70'>
        <AddIcon className='w-3 h-3' />
        추가
      </Button>
    </Link>
  );
};

export default Dashboard;
