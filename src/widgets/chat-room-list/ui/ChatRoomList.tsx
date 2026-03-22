import {useNavigate} from 'react-router-dom';
import type {TChatRoomSummary} from '@/entities/chat/model/types';
import ChatRoomItem from '@/entities/chat/ui/ChatRoomItem';
import ArrowLeftIcon from '@/assets/svg/arrowleftIcon.svg?react';

interface ChatRoomListProps {
  chatRooms: TChatRoomSummary[];
  selectedRoomId: number | null;
  onSelect: (chatRoomId: number) => void;
}

export default function ChatRoomList({
  chatRooms,
  selectedRoomId,
  onSelect,
}: ChatRoomListProps) {
  const navigate = useNavigate();

  return (
    <aside className='w-87.5 bg-white rounded-[30px] shadow-card flex flex-col overflow-hidden shrink-0'>
      {/* 헤더 */}
      <div className='px-6 py-5 flex items-center gap-3 border-b border-stroke overflow-x-hidden'>
        <button
          className='text-light-black hover:text-primary-black transition-colors cursor-pointer'
          onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
        </button>
        <span className='font-semibold text-lg text-primary-black'>채팅</span>
      </div>

      {/* 채팅방 목록 */}
      <ul className='flex-1 overflow-y-auto overflow-x-hidden'>
        {chatRooms.map((room) => (
          <li
            key={room.chatRoomId}
            onClick={() => onSelect(room.chatRoomId)}
            className={`px-5 py-4 cursor-pointer transition-colors border-b border-stroke/50 last:border-b-0 ${
              selectedRoomId === room.chatRoomId
                ? 'bg-background'
                : 'hover:bg-background'
            }`}>
            <ChatRoomItem
              name={room.name}
              studentId={room.studentId}
              lastMessage={room.lastMessage}
            />
          </li>
        ))}
      </ul>
    </aside>
  );
}
