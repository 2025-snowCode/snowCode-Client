import ProfileImage from '@/assets/svg/profileImage.svg?react';
import Ellipse from '@/assets/svg/ellipse.svg?react';

interface ChatRoomItemProps {
  name: string;
  studentId: string;
  lastMessage: string;
}

function Profile() {
  return <ProfileImage className='w-10 h-10 rounded-full shrink-0' />;
}

export default function ChatRoomItem({
  name,
  studentId,
  lastMessage,
}: ChatRoomItemProps) {
  return (
    <div className='flex items-center gap-3'>
      <Profile />
      <div className='flex-1 min-w-0'>
        <div className='font-normal text-sm text-secondary-black flex items-center flex-wrap'>
          <span>{name}</span>
          <Ellipse className='mx-1 w-0.5 h-0.5 shrink-0' />
          <span className='text-secondary-black text-sm font-normal'>
            {studentId}
          </span>
        </div>
        <div className='text-xs px-3.5 py-0.5 bg-background rounded-[20px] border border-stroke text-secondary-black mt-0.5 w-fit max-w-full break-all'>
          {lastMessage}
        </div>
      </div>
    </div>
  );
}
