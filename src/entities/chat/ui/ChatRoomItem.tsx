import Ellipse from '@/assets/svg/ellipse.svg?react';
import ChatProfile from '@/entities/chat/ui/ChatProfile';

interface ChatRoomItemProps {
  memberId: number;
  name: string;
  studentId: string;
  lastMessage: string;
}

export default function ChatRoomItem({
  memberId,
  name,
  studentId,
}: ChatRoomItemProps) {
  return (
    <div className='flex items-center gap-3'>
      <ChatProfile memberId={memberId} />
      <div className='flex-1 min-w-0'>
        <div className='font-normal text-sm text-secondary-black flex items-center flex-wrap'>
          <span>{name}</span>
          <Ellipse className='mx-1 w-0.5 h-0.5 shrink-0' />
          <span className='text-secondary-black text-sm font-normal'>
            {studentId}
          </span>
        </div>
      </div>
    </div>
  );
}
