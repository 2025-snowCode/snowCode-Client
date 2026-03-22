import {useQuery} from '@tanstack/react-query';
import {useSearchParams} from 'react-router-dom';
import ChatRoomList from '@/widgets/chat-room-list/ui/ChatRoomList';
import ChatMessagePanel from '@/widgets/chat-message-panel/ui/ChatMessagePanel';
import {chatQueries, useChatSocket} from '@/entities/chat';

export default function ChatPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedRoomId = Number(searchParams.get('roomId')) || null;

  // TODO: useUserStore에서 가져오기
  const myMemberId = 2;

  const {data: chatRoomList} = useQuery(chatQueries.getChatRooms());
  const {data: chatRoomDetail} = useQuery(chatQueries.getChatRoomDetail(selectedRoomId));
  const {messages, sendMessage} = useChatSocket(selectedRoomId);

  const selectedRoom =
    chatRoomList?.chatRoomList.find((r) => r.chatRoomId === selectedRoomId) ??
    null;

  const chatRoom = chatRoomDetail
    ? {...chatRoomDetail, messages: [...chatRoomDetail.messages, ...messages]}
    : null;

  const handleSelectRoom = (roomId: number) => {
    setSearchParams({roomId: String(roomId)});
  };

  const handleSendMessage = (content: string) => {
    sendMessage({type: 'TEXT', content});
  };

  return (
    <div className='flex h-[calc(100vh-10rem)] gap-4 p-6 max-w-[1240px] mx-auto w-full'>
      <ChatRoomList
        chatRooms={chatRoomList?.chatRoomList ?? []}
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
