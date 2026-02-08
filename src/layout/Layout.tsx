import {useLocation, Outlet} from 'react-router-dom';
import Header from '@/components/common/Header';

const Layout = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const noHeaderPages = ['/admin/chat'];
  const showHeader = !noHeaderPages.includes(pathname);

  return (
    <div className='min-h-screen overflow-x-hidden'>
      <div className='w-[1156px] mx-auto px-4'>
        {showHeader && (
          <div className='pt-10 pb-11'>
            <Header />
          </div>
        )}
        <main className='pb-15'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

