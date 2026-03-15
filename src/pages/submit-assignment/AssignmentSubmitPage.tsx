import AssignmentDetails from './ui/AssignmentDetails';
import CodeEditor from './ui/CodeEditor';
import AssignmentProgressSideBar from './ui/AssignmentSideBar';

const AssignmentSubmitPage = () => {
  return (
    <div className='h-full flex gap-4'>
      <AssignmentProgressSideBar />
      <div className='w-127.5 h-full overflow-hidden custom-scrollbar py-3 px-2 bg-white rounded-[30px] shadow-card'>
        <AssignmentDetails />
      </div>
      <div className='flex-1 min-w-0'>
        {/* TODO: 코드 에디터 및 제출상태 표시 영역*/}
        <CodeEditor />
      </div>
    </div>
  );
};

export default AssignmentSubmitPage;
