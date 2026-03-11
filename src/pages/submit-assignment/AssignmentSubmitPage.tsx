import SurfaceCard from '@/shared/ui/SurfaceCard';
import AssignmentDetails from './ui/AssignmentDetails';
import CodeEditor from './ui/CodeEditor';

const AssignmentSubmitPage = () => {
  return (
    <div className='flex justify-center gap-4'>
      <SurfaceCard className='w-133.5 min-w-0'>
        <AssignmentDetails />
      </SurfaceCard>

      <div className='flex-1 min-h-190 rounded-[30px]'>
        {/* TODO: 코드 에디터 및 제출상태 표시 영역*/}
        <CodeEditor />
      </div>
    </div>
  );
};

export default AssignmentSubmitPage;
