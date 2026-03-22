import {useSearchParams} from 'react-router-dom';
import ChatRoomList from '@/widgets/chat-room-list/ui/ChatRoomList';
import ChatMessagePanel from '@/widgets/chat-message-panel/ui/ChatMessagePanel';
import {MOCK_ROOMS, MOCK_DETAIL} from '@/entities/chat/model/mock'; // TODO: API 연동 시 제거
import type {TChatRoomDetail} from '@/entities/chat/model/types';

export default function ChatPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedRoomId = Number(searchParams.get('roomId')) || null;

  // TODO: useUserStore에서 myMemberId 가져오기
  const myMemberId = 2;

  // TODO: API 연동 시 selectedRoomId로 채팅방 상세 조회
  const selectedRoom = MOCK_ROOMS.find(r => r.chatRoomId === selectedRoomId) ?? null;
  const chatRoom: TChatRoomDetail | null = selectedRoomId
    ? {...MOCK_DETAIL, chatRoomId: selectedRoomId}
    : null;

  const handleSelectRoom = (roomId: number) => {
    setSearchParams({roomId: String(roomId)});
  };

  // TODO: 웹소켓 전송으로 교체
  const handleSendMessage = (content: string) => {
    console.log('send:', content);
  };

  return (
    <div className='flex h-[calc(100vh-10rem)] gap-4 p-6 max-w-[1240px] mx-auto w-full'>
      <ChatRoomList
        chatRooms={MOCK_ROOMS}
        selectedRoomId={selectedRoomId}
        onSelect={handleSelectRoom}
      />
      <ChatMessagePanel
        chatRoom={chatRoom}
        lastMessage={selectedRoom?.lastMessage}
        myMemberId={myMemberId}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
