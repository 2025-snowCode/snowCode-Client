import {useQuery} from '@tanstack/react-query';
import {useSearchParams} from 'react-router-dom';
import ChatRoomList from '@/widgets/chat-room-list/ui/ChatRoomList';
import ChatMessagePanel from '@/widgets/chat-message-panel/ui/ChatMessagePanel';
import {chatQueries, useChatSocket} from '@/entities/chat';
import {useUserStore} from '@/entities/auth/model/useUserStore';
import {useMemo} from 'react';

export default function ChatPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const roomIdParam = searchParams.get('roomId');
  const selectedRoomId =
    roomIdParam !== null && roomIdParam !== '' ? Number(roomIdParam) : null;
  const myMemberId = useUserStore((s) => s.memberId) ?? 0;

  const {data: chatRoomList} = useQuery(chatQueries.getChatRooms());
  const {data: chatRoomDetail} = useQuery(
    chatQueries.getChatRoomDetail(selectedRoomId)
  );
  const {messages, sendMessage} = useChatSocket(selectedRoomId, myMemberId);

  const selectedRoom =
    chatRoomList?.chatRoomList.find((r) => r.chatRoomId === selectedRoomId) ??
    null;

  const chatRoom = useMemo(() => {
    if (!chatRoomDetail) return null;
    return {
      ...chatRoomDetail,
      messages: [...chatRoomDetail.messages, ...messages],
    };
  }, [chatRoomDetail, messages]);

  const handleSelectRoom = (roomId: number) => {
    setSearchParams({roomId: String(roomId)});
  };

  const handleSendMessage = (content: string): boolean => {
    if (!selectedRoomId || !chatRoomDetail) return false;

    return sendMessage({
      type: 'TEXT',
      content,
      chatRoomId: selectedRoomId,
      receiverId: chatRoomDetail.opponentId,
    });
  };

  return (
    <div className='flex h-[calc(100vh-10rem)] gap-4 p-6 max-w-310 mx-auto w-full'>
      <ChatRoomList
        chatRooms={chatRoomList?.chatRoomList ?? []}
        selectedRoomId={selectedRoomId}
        onSelect={handleSelectRoom}
      />
      <ChatMessagePanel
        chatRoom={chatRoom}
        lastMessage={selectedRoom?.lastMessage ?? undefined}
        myMemberId={myMemberId}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
