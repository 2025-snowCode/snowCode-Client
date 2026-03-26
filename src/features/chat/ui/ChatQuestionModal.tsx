import {useQuery} from '@tanstack/react-query';
import {chatQueries} from '@/entities/chat/api/chatQueries';
import {useChatSocket} from '@/entities/chat/model/useChatSocket';
import {useUserStore} from '@/entities/auth/model/useUserStore';
import ChatMessagePanel from '@/widgets/chat-message-panel/ui/ChatMessagePanel';
import DeleteIcon from '@/assets/svg/deleteIcon.svg?react';
import AssignmentIcon from '@/assets/svg/assignmentIcon.svg?react';

interface ChatQuestionModalProps {
  chatRoomId: number;
  assignmentTitle: string;
  getCurrentCode: () => string;
  closeModal: () => void;
}

const ChatQuestionModal = ({
  chatRoomId,
  assignmentTitle,
  getCurrentCode,
  closeModal,
}: ChatQuestionModalProps) => {
  const myMemberId = useUserStore((state) => state.memberId);

  // 기존 채팅 내역 조회
  const {data: chatRoom} = useQuery(chatQueries.getChatRoomDetail(chatRoomId));

  // 실시간 소켓 연결
  const {messages: socketMessages, sendMessage} = useChatSocket(
    chatRoomId,
    myMemberId || 0
  );

  // 초기 메시지와 실시간 메시지 병합
  const combinedChatRoom = chatRoom
    ? {
        ...chatRoom,
        messages: [...chatRoom.messages, ...socketMessages],
      }
    : null;

  const handleSendMessage = (
    content: string,
    type: 'TEXT' | 'CODE' = 'TEXT'
  ) => {
    if (!chatRoom) return false;
    return sendMessage({
      chatRoomId,
      content,
      type,
      receiverId: chatRoom.opponentId,
    });
  };

  const handleSendCode = () => {
    const code = getCurrentCode();
    if (!code) return;

    // 무엇에 대한 질문인지 먼저 텍스트로 보냄
    handleSendMessage(`[문의 과제] ${assignmentTitle}`, 'TEXT');
    handleSendMessage(code, 'CODE');
  };

  return (
    <div className='fixed bottom-24 right-8 z-50 w-100 h-150 flex flex-col bg-white rounded-[30px] shadow-2xl overflow-hidden border border-stroke animate-in slide-in-from-bottom-5 duration-300'>
      <div className='px-6 py-4 bg-primary text-white flex items-center justify-between'>
        <div className='flex flex-col'>
          <h3 className='text-sm font-semibold'>질문하기</h3>
          <p className='text-[11px] opacity-70 truncate max-w-50'>
            {assignmentTitle}
          </p>
        </div>
        <button
          onClick={closeModal}
          className='p-1 hover:bg-white/20 rounded-full transition-colors'>
          <DeleteIcon className='w-5 h-5 text-white' />
        </button>
      </div>

      <ChatMessagePanel
        chatRoom={combinedChatRoom}
        myMemberId={myMemberId || 0}
        onSendMessage={handleSendMessage}
        isCompact={true}
        customActions={
          <button
            onClick={handleSendCode}
            className='flex items-center gap-1.5 px-3 py-1 bg-secondary-black text-white rounded-full text-[11px] font-medium hover:bg-primary-black transition-colors'>
            <AssignmentIcon className='w-3.5 h-3.5 text-white' />
            현재 코드 첨부하여 질문
          </button>
        }
      />
    </div>
  );
};

export default ChatQuestionModal;
