import {useNavigate} from 'react-router-dom';
import BaseHeader from '@/shared/ui/BaseHeader';
import NotificationIcon from '@/assets/svg/notificationIcon.svg?react';
import SignoutIcon from '@/assets/svg/signoutIcon.svg?react';
import UserIcon from '@/assets/svg/userIcon.svg?react';
import ChatIcon from '@/assets/svg/chatIcon.svg?react';
import Button from '@/shared/ui/button/Button';
import {useUserStore} from '@/entities/auth/model/useUserStore';

interface NavButton {
  icon: React.ReactElement;
  label: string;
  onClick: () => void;
}

const NavigationBar = ({buttons}: {buttons: NavButton[]}) => (
  <nav
    className={`bg-gradient-to-r from-light-purple to-purple h-full px-3 py-[8px] rounded-full flex items-center justify-center gap-9`}>
    {buttons.map((button, index) => (
      <Button
        key={index}
        content='icon'
        size='icon'
        aria-label={button.label}
        onClick={button.onClick}>
        {button.icon}
      </Button>
    ))}
  </nav>
);

const WelcomeMessage = ({userName}: {userName: string}) => (
  <span className='text-lg font-normal'>
    <span className='font-medium'>{userName}</span>님 환영합니다!
  </span>
);

const AuthenticatedHeader = ({showChat}: {showChat: boolean}) => {
  const navigate = useNavigate();
  const userName = useUserStore((state) => state.userName);
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const commonButtons: NavButton[] = [
    {
      icon: <NotificationIcon width={24} height={29} />,
      label: '알림',
      onClick: () => {},
    },
    {
      icon: <UserIcon width={27} height={28} />,
      label: '프로필',
      onClick: () => {},
    },
    {
      icon: <SignoutIcon width={27} height={27} />,
      label: '로그아웃',
      onClick: handleLogout,
    },
  ];

  const chatButton: NavButton = {
    icon: <ChatIcon width={24} height={24} />,
    label: '채팅',
    onClick: () => navigate('/admin/chat'),
  };

  const buttons = showChat ? [chatButton, ...commonButtons] : commonButtons;

  return (
    <BaseHeader
      leftContent={<WelcomeMessage userName={userName} />}
      rightContent={<NavigationBar buttons={buttons} />}
    />
  );
};

const GuestHeader = () => (
  <BaseHeader
    rightContent={
      <div className='pr-8 text-primary text-center text-4xl font-normal leading-[1.56rem] font-coolvetica'>
        snowcode
      </div>
    }
  />
);

export default function Header() {
  const userType = useUserStore((state) => state.userType);

  switch (userType) {
    case 'admin':
      return <AuthenticatedHeader showChat={true} />;
    case 'student':
      return <AuthenticatedHeader showChat={false} />;
    case 'guest':
    default:
      return <GuestHeader />;
  }
}
