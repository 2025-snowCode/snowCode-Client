import {useState} from 'react';
import {tv} from 'tailwind-variants';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {oneDark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import type {TChatRoomDetail} from '@/entities/chat/model/schemas';
import {formatTime, formatDateLabel, getDateKey} from '@/shared/lib/chat';
import ChatRoomItem from '@/entities/chat/ui/ChatRoomItem';
import ChatProfile from '@/entities/chat/ui/ChatProfile';

const panelStyles = tv({
  slots: {
    container: 'flex-1 bg-white flex flex-col overflow-hidden',
    messageContainer:
      'flex-1 overflow-y-auto flex flex-col gap-1 custom-scrollbar',
    inputArea: 'border-t border-stroke flex flex-col gap-2',
    emptyState: 'flex-1 bg-white flex-center text-light-black',
  },
  variants: {
    isCompact: {
      true: {
        container: '',
        messageContainer: 'px-4 py-2',
        inputArea: 'px-4 py-3',
        emptyState: 'rounded-b-[20px]',
      },
      false: {
        container: 'rounded-[20px] shadow-card',
        messageContainer: 'px-6 py-4',
        inputArea: 'px-5 py-4',
        emptyState: 'rounded-[20px]',
      },
    },
  },
  defaultVariants: {
    isCompact: false,
  },
});

interface ChatMessagePanelProps {
  chatRoom: TChatRoomDetail | null;
  lastMessage?: string;
  myMemberId: number;
  onSendMessage: (content: string) => boolean;
  customActions?: React.ReactNode;
  isCompact?: boolean;
}

interface MessageItemProps {
  message: TChatRoomDetail['messages'][0];
  isMine: boolean;
  isFirstInGroup: boolean;
  isLastInGroup: boolean;
  opponentId: number;
}

function MessageItem({
  message,
  isMine,
  isFirstInGroup,
  isLastInGroup,
  opponentId,
}: MessageItemProps) {
  return (
    <div
      className={`flex gap-2 ${isMine ? 'justify-end items-end' : 'justify-start items-start'} ${!isFirstInGroup ? '-mt-1' : ''}`}>
      {!isMine && (
        <div className='w-7 shrink-0 flex justify-center self-start'>
          {isFirstInGroup ? (
            <ChatProfile memberId={opponentId} size='sm' />
          ) : null}
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

      {message.messageType === 'CODE' ? (
        <div className='max-w-xs rounded-2xl overflow-hidden text-sm'>
          <SyntaxHighlighter
            style={oneDark}
            PreTag='div'
            language='python'
            customStyle={{
              margin: 0,
              borderRadius: '1rem',
              fontSize: '0.75rem',
              padding: '0.75rem 1rem',
              maxWidth: '100%',
              overflowX: 'auto',
            }}>
            {message.content}
          </SyntaxHighlighter>
        </div>
      ) : (
        <div
          className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed ${
            isMine
              ? 'bg-primary text-white'
              : 'bg-background text-primary-black'
          }`}>
          {message.content}
        </div>
      )}

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
  customActions,
  isCompact = false,
}: ChatMessagePanelProps) {
  const [input, setInput] = useState('');
  const {container, messageContainer, inputArea, emptyState} = panelStyles({
    isCompact,
  });

  if (!chatRoom) {
    return <div className={emptyState()}>채팅방을 선택해주세요</div>;
  }

  const handleSend = () => {
    if (!input.trim()) return;
    const sent = onSendMessage(input.trim());
    if (sent) setInput('');
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
    <div className={container()}>
      {/* 헤더 */}
      {!isCompact && (
        <div className='px-6 py-4 border-b border-stroke'>
          <ChatRoomItem
            memberId={chatRoom.opponentId}
            name={chatRoom.opponentName}
            studentId={chatRoom.opponentStudentId ?? ''}
            lastMessage={lastMessage}
          />
        </div>
      )}

      {/* 메시지 영역 */}
      <div className={messageContainer()}>
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
                    opponentId={chatRoom.opponentId}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 액션 및 입력창 */}
      <div className={inputArea()}>
        {customActions && (
          <div className='flex items-center gap-2'>{customActions}</div>
        )}
        <div className='flex items-center gap-3'>
          <input
            className='flex-1 bg-white rounded-[40px] px-5 py-2 text-sm outline-none shadow-card border border-stroke placeholder:text-light-black'
            placeholder='채팅을 입력하세요...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === 'Enter' &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing
              ) {
                e.preventDefault();
                handleSend();
              }
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
    </div>
  );
}
