import {Outlet} from 'react-router-dom';
import Header from '@/shared/ui/Header';

const Layout = () => {
  return (
    <div className='min-h-screen overflow-x-hidden flex justify-center'>
      <div className='min-w-289 px-4 py-12'>
        <div className='w-289 pb-8 mx-auto relative z-10'>
          <Header />
        </div>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
