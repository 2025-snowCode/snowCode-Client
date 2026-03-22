import {useState} from 'react';
import type {TChatRoomDetail} from '@/entities/chat/model/types';
import ProfileImage from '@/assets/svg/profileImage.svg?react';
import {formatTime, formatDateLabel, getDateKey} from '@/shared/lib/chat';
import ChatRoomItem from '@/entities/chat/ui/ChatRoomItem';

interface ChatMessagePanelProps {
  chatRoom: TChatRoomDetail | null;
  lastMessage?: string;
  myMemberId: number;
  onSendMessage: (content: string) => void;
}

interface MessageItemProps {
  message: TChatRoomDetail['messages'][0];
  isMine: boolean;
  isFirstInGroup: boolean;
  isLastInGroup: boolean;
}

function Profile({size = 'md'}: {size?: 'sm' | 'md'}) {
  const sizeClass = size === 'sm' ? 'w-7 h-7' : 'w-10 h-10';
  return <ProfileImage className={`${sizeClass} rounded-full shrink-0`} />;
}

function MessageItem({
  message,
  isMine,
  isFirstInGroup,
  isLastInGroup,
}: MessageItemProps) {
  return (
    <div
      className={`flex gap-2 ${isMine ? 'justify-end items-end' : 'justify-start items-start'} ${!isFirstInGroup ? '-mt-1' : ''}`}>
      {!isMine && (
        <div className='w-7 shrink-0 flex justify-center self-start'>
          {isFirstInGroup ? <Profile size='sm' /> : null}
        </div>
      )}

      {isMine && (
        <div className='w-12 flex justify-end self-end'>
          {isLastInGroup && (
            <span className='text-[10px] text-light-black shrink-0 mb-0.5'>
              {formatTime(message.sendAt)}
            </span>
          )}
        </div>
      )}

      <div
        className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed ${
          isMine ? 'bg-primary text-white' : 'bg-background text-primary-black'
        } ${message.messageType === 'CODE' ? 'font-mono' : ''}`}>
        {message.content}
      </div>

      {!isMine && (
        <div className='w-12 flex justify-start self-end'>
          {isLastInGroup && (
            <span className='text-[10px] text-light-black shrink-0 mb-0.5'>
              {formatTime(message.sendAt)}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default function ChatMessagePanel({
  chatRoom,
  lastMessage = '',
  myMemberId,
  onSendMessage,
}: ChatMessagePanelProps) {
  const [input, setInput] = useState('');

  if (!chatRoom) {
    return (
      <div className='flex-1 bg-white rounded-[20px] flex-center text-light-black'>
        채팅방을 선택해주세요
      </div>
    );
  }

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input.trim());
    setInput('');
  };

  // 날짜별 메시지 그룹화
  const dateGroups: {
    dateKey: string;
    label: string;
    messages: typeof chatRoom.messages;
  }[] = [];

  for (const msg of chatRoom.messages) {
    const dateKey = getDateKey(msg.sendAt);
    const last = dateGroups[dateGroups.length - 1];
    if (last?.dateKey === dateKey) {
      last.messages.push(msg);
    } else {
      dateGroups.push({
        dateKey,
        label: formatDateLabel(msg.sendAt),
        messages: [msg],
      });
    }
  }

  return (
    <div className='flex-1 bg-white rounded-[20px] shadow-card flex flex-col overflow-hidden'>
      {/* 헤더 */}
      <div className='px-6 py-4 border-b border-stroke'>
        <ChatRoomItem
          name={chatRoom.opponentName}
          studentId={chatRoom.opponentStudentId ?? ''}
          lastMessage={lastMessage}
        />
      </div>

      {/* 메시지 영역 */}
      <div className='flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-1 custom-scrollbar'>
        {dateGroups.map(({dateKey, label, messages}) => (
          <div key={dateKey}>
            {/* 날짜 구분선 */}
            <div className='flex justify-center my-4'>
              <span className='text-xs text-light-black'>{label}</span>
            </div>

            <div className='flex flex-col gap-2'>
              {messages.map((msg, index) => {
                const isMine = msg.memberId === myMemberId;
                const prevMsg = messages[index - 1];
                const nextMsg = messages[index + 1];

                const isFirstInGroup =
                  !prevMsg ||
                  prevMsg.memberId !== msg.memberId ||
                  formatTime(prevMsg.sendAt) !== formatTime(msg.sendAt);
                const isLastInGroup =
                  !nextMsg ||
                  nextMsg.memberId !== msg.memberId ||
                  formatTime(nextMsg.sendAt) !== formatTime(msg.sendAt);

                return (
                  <MessageItem
                    key={msg.messageId}
                    message={msg}
                    isMine={isMine}
                    isFirstInGroup={isFirstInGroup}
                    isLastInGroup={isLastInGroup}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 입력창 */}
      <div className='px-5 py-4 flex items-center gap-3'>
        <input
          className='flex-1 bg-white rounded-[40px] px-5 py-2 text-sm outline-none shadow-card placeholder:text-light-black'
          placeholder='채팅을 입력하세요...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) handleSend();
          }}
        />
        <button
          className='px-5 py-2 bg-primary text-white rounded-[40px] text-sm font-medium shadow-card disabled:opacity-40 hover:bg-hover transition-colors shrink-0'
          disabled={!input.trim()}
          onClick={handleSend}>
          보내기
        </button>
      </div>
    </div>
  );
}
