import SurfaceCard from '@/shared/ui/SurfaceCard';
import AssignmentDetails from './ui/AssignmentDetails';

const AssignmentSubmitPage = () => {
  return (
    <div className='flex justify-center gap-4'>
      <SurfaceCard className='w-133.5 min-w-0'>
        <AssignmentDetails />
      </SurfaceCard>
      <div className='flex-1 bg-primary-black rounded-[30px]'>
        {/* TODO: 코드 에디터 및 제출상태 표시 영역*/}
      </div>
    </div>
  );
};

export default AssignmentSubmitPage;
