// Layout.js
import {useLocation, Outlet} from 'react-router-dom';
import BaseHeader from '@/components/common/BaseHeader';
import NotificationIcon from '@/assets/svg/notificationIcon.svg?react';
import SignoutIcon from '@/assets/svg/signoutIcon.svg?react';
import UserIcon from '@/assets/svg/userIcon.svg?react';
import ChatIcon from '@/assets/svg/chatIcon.svg?react';
import IconButton from '@/components/common/IconButton';
import React from 'react';

type UserType = 'admin' | 'student';

interface NavButton {
  icon: React.ReactElement;
  label: string;
}

const Layout = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // 헤더 없는 페이지 설정
  const noHeaderPages = ['/admin/chat'];
  const showHeader = !noHeaderPages.includes(pathname);

  // 네비게이션 아이콘 버튼들
  const getNavigationButtons = (userType: UserType): NavButton[] => {
    const commonButtons: NavButton[] = [
      {icon: <NotificationIcon width={24} height={29} />, label: '알림'},
      {icon: <UserIcon width={27} height={28} />, label: '프로필'},
      {icon: <SignoutIcon width={27} height={27} />, label: '로그아웃'},
    ];

    if (userType === 'admin') {
      return [
        {icon: <ChatIcon width={24} height={24} />, label: '채팅'},
        ...commonButtons,
      ];
    }

    return commonButtons;
  };

  // 사용자 환영 메시지
  const getWelcomeMessage = (userName: string) => (
    <span className='text-lg font-normal'>
      <span className='font-medium'>{userName}</span>님 환영합니다!
    </span>
  );

  // 네비게이션 컴포넌트
  const NavigationBar = ({
    buttons,
    width,
  }: {
    buttons: NavButton[];
    width: string;
  }) => (
    <nav
      className={`flex-1 bg-gradient-to-r from-light-purple to-purple ${width} h-full px-3 py-[8px] rounded-full flex items-center justify-between gap-9`}>
      {buttons.map((button, index) => (
        <IconButton key={index} icon={button.icon} aria-label={button.label} />
      ))}
    </nav>
  );

  // 헤더 컨텐츠 결정
  const getHeaderContent = () => {
    if (
      pathname === '/' ||
      pathname.startsWith('/common') ||
      pathname.startsWith('/userid')
    ) {
      return {
        rightContent: (
          <div className='pr-8 text-primary text-center text-4xl font-normal leading-[1.56rem] font-coolvetica'>
            snowcode
          </div>
        ),
      };
    }

    switch (true) {
      case pathname.startsWith('/admin'):
        return {
          leftContent: getWelcomeMessage('김조교'),
          rightContent: (
            <NavigationBar
              buttons={getNavigationButtons('admin')}
              width='w-1/3'
            />
          ),
        };

      case pathname.startsWith('/student'):
        return {
          leftContent: getWelcomeMessage('문서영'),
          rightContent: (
            <NavigationBar
              buttons={getNavigationButtons('student')}
              width='w-1/4'
            />
          ),
        };

      default:
        return {};
    }
  };

  return (
    <div className='min-h-screen overflow-x-hidden relative'>
      {/* 헤더와 컨텐츠 모두 동일한 컨테이너 사용 */}
      <div className='flex justify-center '>
        <div className='w-[1156px] px-4'>
          {showHeader && (
            <div className='pt-10 z-10 relative'>
              <BaseHeader {...getHeaderContent()} />
            </div>
          )}

          <div className={`${showHeader ? 'pt-11' : ''} pb-15`}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
