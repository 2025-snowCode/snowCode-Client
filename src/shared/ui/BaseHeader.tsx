import logo from '@/assets/images/snowCode_logo.svg';
import {Link} from 'react-router-dom';
import {ROUTES} from '@/shared/config/routes';

interface BaseHeaderProps {
  logoHref?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}

export default function BaseHeader({
  logoHref,
  leftContent,
  rightContent,
}: BaseHeaderProps) {
  return (
    <header className='my-0 pl-8 w-full h-20 bg-white rounded-full drop-shadow-md drop-shadow-stroke/50 flex justify-between items-center'>
      {/* 로고 + 왼쪽 콘텐츠 */}
      <div className='flex items-center gap-8'>
        <Link to={logoHref ?? ROUTES.ROOT}>
          <img src={logo} alt='logo' className='h-8' />
        </Link>
        {leftContent}
      </div>

      {/* 오른쪽 콘텐츠 */}
      <div className='flex items-center'>{rightContent}</div>
    </header>
  );
}
