import logo from '../../assets/images/snowCode_logo.svg';
import {NotificationIcon, SignoutIcon, UserIcon} from '../../assets/svg';
import Button from './Button';

const StudentHeader = () => {
  return (
    <header className='flex-center mx-auto my-0 pl-8 w-289 h-20 bg-white rounded-full drop-shadow-md drop-shadow-stroke/50'>
      <div className='flex-center w-3/4 gap-8'>
        <img src={logo} alt='snowCode-logo' />
        <span className='text-lg'>문서영님 환영합니다!</span>
      </div>
      <nav className='flex-1 bg-linear-to-r from-light-purple to-purple w-1/4 h-full px-3 rounded-full flex-center justify-between'>
        <Button icon={<NotificationIcon width={24} height={29} />} />
        <Button icon={<UserIcon width={27} height={28} />} />
        <Button icon={<SignoutIcon width={27} height={27} />} />
      </nav>
    </header>
  );
};

export default StudentHeader;
