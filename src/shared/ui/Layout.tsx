import {useLocation, Outlet} from 'react-router-dom';
import Header from '@/shared/ui/Header';

const Layout = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const noHeaderPages = ['/admin/chat'];
  const showHeader = !noHeaderPages.includes(pathname);

  return (
    <div className='min-h-screen overflow-x-hidden flex justify-center'>
      <div className='min-w-289 px-4 py-12'>
        {showHeader && (
          <div className='w-289 pb-8 mx-auto'>
            <Header />
          </div>
        )}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
