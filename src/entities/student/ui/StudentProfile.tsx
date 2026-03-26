import ProfileImage from '@/assets/svg/profileImage.svg?react';
import ChatIcon from '@/assets/svg/chatIcon.svg?react';
import MailIcon from '@/assets/svg/mailIcon.svg?react';
import Button from '@/shared/ui/button/Button';
interface StudentProfileProps {
  name: string;
  studentId: string;
  onChat?: () => void;
}

export const StudentProfile = ({
  name,
  studentId,
  onChat,
}: StudentProfileProps) => {
  const sendEmail = () => {
    window.location.href = 'mailto:example@gmail.com';
  };

  return (
    <div className='flex flex-col bg-white w-112.5 h-117.5 rounded-[30px] items-center justify-center shrink-0 gap-[25.5px]'>
      <ProfileImage className='w-45 h-45' />
      <div>
        <p className='text-2xl text-black font-semibold'>{name}</p>
        <p className='text-secondary-black text-lg font-normal'>{studentId}</p>
      </div>
      <div className='flex gap-5.5 pt-2.75'>
        <Button
          color='primary'
          size='compact'
          content='mixed'
          type='button'
          onClick={onChat}>
          <div
            className='flex gap-2.5 items-center
        '>
            <ChatIcon />
            <span>채팅</span>
          </div>
        </Button>
        <Button
          color='primary'
          size='compact'
          content='mixed'
          type='button'
          onClick={sendEmail}>
          <div className='flex gap-2.5 items-center'>
            <MailIcon />
            <span>메일</span>
          </div>
        </Button>
      </div>
    </div>
  );
};
