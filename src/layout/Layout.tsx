import {useLocation, Outlet} from 'react-router-dom';
import BaseHeader from '../components/common/BaseHeader';
import {NotificationIcon, SignoutIcon, UserIcon, ChatIcon} from '../assets/svg';
import Button from '../components/common/Button';

const Layout = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // 헤더 없는 페이지
  const noHeaderPages = ['/admin/chat']; // 관리자 채팅 페이지
  const showHeader = !noHeaderPages.includes(pathname);

  // 헤더 내부 결정
  const getHeaderContent = () => {
    switch (true) {
      case pathname.startsWith('/common'):
        return {
          rightContent: (
            <div className='pr-8 text-primary text-center text-4xl font-normal leading-[1.56rem] font-Coolvetica'>
              snowcode
            </div>
          ),
        };

      case pathname.startsWith('/admin'):
        return {
          leftContent: (
            <span className='text-lg font-normal'>
              <span className='font-medium'>김조교</span>님 환영합니다!
            </span>
          ),
          rightContent: (
            <nav className='flex-1 bg-linear-to-r from-light-purple to-purple w-1/3 h-full px-3 rounded-full flex-center justify-between'>
              <Button icon={<ChatIcon width={27} height={27} />} />
              <Button icon={<NotificationIcon width={24} height={29} />} />
              <Button icon={<UserIcon width={27} height={28} />} />
              <Button icon={<SignoutIcon width={27} height={27} />} />
            </nav>
          ),
        };

      case pathname.startsWith('/student'):
        return {
          leftContent: (
            <span className='text-lg font-normal'>
              <span className='font-medium'>문서영</span>님 환영합니다!
            </span>
          ),
          rightContent: (
            <nav className='flex-1 bg-linear-to-r from-light-purple to-purple w-1/4 h-full px-3 rounded-full flex-center justify-between'>
              <Button icon={<NotificationIcon width={24} height={29} />} />
              <Button icon={<UserIcon width={27} height={28} />} />
              <Button icon={<SignoutIcon width={27} height={27} />} />
            </nav>
          ),
        };

      default:
        return {};
    }
  };

  return (
    <div className='w-full min-h-screen overflow-x-hidden'>
      {showHeader && <BaseHeader {...getHeaderContent()} />}
      <div className={`flex justify-center ${showHeader ? 'pt-10' : ''}`}>
        <div className=''>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
