import ProfileImage from '@/assets/svg/profileImage.svg?react';
import ChatIcon from '@/assets/svg/chatIcon.svg?react';
import MailIcon from '@/assets/svg/mailIcon.svg?react';
import Button from '@/components/common/Button';

interface StudentProfileProps {
  name: string;
  studentId: string;
}

export const StudentProfile = ({name, studentId}: StudentProfileProps) => {
  return (
    <div className='flex flex-col bg-white w-[450px] h-[470px] rounded-[30px] items-center justify-center shrink-0 gap-[25.5px]'>
      <ProfileImage className='w-[180px] h-[180px]' />
      <div>
        <p className='text-2xl text-black font-semibold'>{name}</p>
        <p className='text-secondary-black text-lg font-normal'>{studentId}</p>
      </div>
      <div className='flex gap-[22px] pt-[11px]'>
        <Button color='primary' size='compact' content='mixed' type='button'>
          <div
            className='flex gap-2.5 items-center
        '>
            <ChatIcon />
            <span>채팅</span>
          </div>
        </Button>
        <Button color='primary' size='compact' content='mixed' type='button'>
          <div className='flex gap-2.5 items-center'>
            <MailIcon />
            <span>메일</span>
          </div>
        </Button>
      </div>
    </div>
  );
};
