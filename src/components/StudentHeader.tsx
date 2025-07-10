import logo from '../assets/images/snowCode_logo.svg';
import {NotificationIcon, SignoutIcon, UserIcon} from '../assets/svg';

const StudentHeader = () => {
  return (
    <div className='flex items-center mx-auto my-0 w-289 h-20 pl-8 bg-white rounded-full drop-shadow-md drop-shadow-stroke/50'>
      <div className='flex items-center w-3/4 gap-8'>
        <img src={logo} alt='snowCode-logo' />
        <span className='text-lg'>문서영님 환영합니다!</span>
      </div>
      <div className='flex-1 bg-linear-to-r from-lightPurple to to-purple max-w-1/4 h-full rounded-full flex justify-between items-center px-3'>
        <button className='header-btn'>
          <NotificationIcon width={24} height={29} />
        </button>
        <button className='header-btn'>
          <UserIcon width={27} height={28} />
        </button>
        <button className='header-btn'>
          <SignoutIcon width={27} height={27} />
        </button>
      </div>
    </div>
  );
};

export default StudentHeader;
