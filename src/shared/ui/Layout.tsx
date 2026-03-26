import {Outlet} from 'react-router-dom';
import Header from '@/shared/ui/Header';
import {Suspense} from 'react';
import Loading from './Loading';
import Toast from './Toast';

const Layout = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className='min-h-screen overflow-x-clip flex justify-center'>
        <div className='min-w-289 px-4 py-12'>
          <div className='w-289 pb-8 mx-auto relative z-10'>
            <Header />
          </div>

          <main>
            <Toast />
            <Outlet />
          </main>
        </div>
      </div>
    </Suspense>
  );
};

export default Layout;
