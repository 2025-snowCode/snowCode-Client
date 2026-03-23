import Header from '@/shared/ui/Header';
import {Outlet} from 'react-router-dom';

const AssignmentSubmitLayout = () => {
  return (
    <div className='h-screen overflow-hidden flex flex-col pl-26'>
      <div className='px-4 py-6'>
        <Header />
      </div>
      <main className='flex-1 overflow-hidden px-4 pb-6'>
        <Outlet />
      </main>
    </div>
  );
};

export default AssignmentSubmitLayout;
