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
  const sentMessagesRef = useRef<Set<string>>(new Set());

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
            // 이 탭에서 방급 보낸 메시지인지 확인 (중복 방지)
            const msgKey = `${parsed.content}_${parsed.sendAt.substring(0, 16)}`;
            if (
              parsed.senderId === myMemberId &&
              sentMessagesRef.current.has(msgKey)
            ) {
              sentMessagesRef.current.delete(msgKey);
              return;
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
      console.log('메세지 전송 시도:', {
        destination: '/pub/chat',
        payload,
        hasToken: !!token,
        tokenPrefix: token ? token.substring(0, 10) : 'none',
      });

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

      const msgKey = `${payload.content}_${isoString.substring(0, 16)}`;
      sentMessagesRef.current.add(msgKey);

      setMessages((prev) => [...prev, newMessage]);

      return true;
    } catch (error) {
      console.error('메세지 전송 중 에러 발생:', error);
      return false;
    }
  };

  return {messages, sendMessage};
};
