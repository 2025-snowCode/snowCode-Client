import {useLocation, Outlet} from 'react-router-dom';
import Header from '@/components/common/Header';

const Layout = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const noHeaderPages = ['/admin/chat'];
  const showHeader = !noHeaderPages.includes(pathname);

  return (
    <div className='min-h-screen overflow-x-hidden flex items-center'>
      <div className='w-[1156px] mx-auto px-4 py-12'>
        {showHeader && (
          <div className='pb-8'>
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
