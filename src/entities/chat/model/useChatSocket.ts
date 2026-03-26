import {useEffect, useRef, useState} from 'react';
import type {Client} from '@stomp/stompjs';
import {createStompClient} from '@/shared/lib/stompClient';
import {socketMessageResponseSchema} from '@/entities/chat/model/schemas';
import type {TChatMessage, TSendMessage} from '@/entities/chat/model/schemas';
import {useUserStore} from '@/entities/auth/model/useUserStore';

export const useChatSocket = (
  chatRoomId: number | null,
  myMemberId: number
) => {
  const clientRef = useRef<Client | null>(null);
  const [messages, setMessages] = useState<TChatMessage[]>([]);
  // 최근 내가 이 탭에서 보낸 메시지들을 추적하여 중복 방지
  const sentMessagesRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    if (!chatRoomId) return;

    const client = createStompClient();

    client.onConnect = () => {
      console.log('Connected to WebSocket');
      // 개인 큐 구독 (서버의 convertAndSendToUser 대응)
      client.subscribe('/user/queue/messages', (frame) => {
        try {
          const rawData = JSON.parse(frame.body);
          console.log('Received raw message:', rawData);
          const parsed = socketMessageResponseSchema.parse(rawData);

          if (parsed.chatRoomId === chatRoomId) {
            // 이 탭에서 방금 보낸 메시지인지 확인 (중복 방지)
            if (parsed.senderId === myMemberId) {
              const msgKey = parsed.content;
              const count = sentMessagesRef.current.get(msgKey) ?? 0;
              if (count > 0) {
                if (count === 1) sentMessagesRef.current.delete(msgKey);
                else sentMessagesRef.current.set(msgKey, count - 1);
                return;
              }
            }

            const message: TChatMessage = {
              messageId: Date.now(),
              memberId: parsed.senderId,
              messageType: parsed.type,
              content: parsed.content,
              sendAt: parsed.sendAt,
            };
            setMessages((prev) => [...prev, message]);
          }
        } catch (error) {
          console.error('Failed to parse or map chat message:', error);
        }
      });
    };

    client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
      clientRef.current = null;
      setMessages([]);
      sentMessagesRef.current.clear();
    };
  }, [chatRoomId, myMemberId]);

  const sendMessage = (payload: TSendMessage): boolean => {
    const client = clientRef.current;

    if (!client?.connected || !client?.active) {
      console.warn('WebSocket이 활성화되어 있지 않거나 끊겨 있습니다.', {
        connected: client?.connected,
        active: client?.active,
      });
      return false;
    }

    try {
      const token = useUserStore.getState().accessToken;

      client.publish({
        destination: '/pub/chat',
        headers: {Authorization: token ? `Bearer ${token}` : ''},
        body: JSON.stringify(payload),
      });

      // 낙관적 업데이트 (Optimistic UI)
      const now = new Date();
      const isoString = now.toISOString();
      const newMessage: TChatMessage = {
        messageId: Date.now(), // 임시 ID
        memberId: myMemberId,
        messageType: payload.type,
        content: payload.content,
        sendAt: isoString,
      };

      const msgKey = payload.content;
      sentMessagesRef.current.set(
        msgKey,
        (sentMessagesRef.current.get(msgKey) ?? 0) + 1
      );

      setMessages((prev) => [...prev, newMessage]);

      return true;
    } catch (error) {
      console.error('메세지 전송 중 에러 발생:', error);
      return false;
    }
  };

  return {messages, sendMessage};
};
