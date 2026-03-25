import {useEffect, useRef, useState} from 'react';
import type {Client} from '@stomp/stompjs';
import {createStompClient} from '@/shared/lib/stompClient';
import {socketMessageResponseSchema} from '@/entities/chat/model/schemas';
import type {TChatMessage, TSendMessage} from '@/entities/chat/model/schemas';
import {useUserStore} from '@/entities/auth/model/useUserStore';

export const useChatSocket = (chatRoomId: number | null) => {
  const clientRef = useRef<Client | null>(null);
  const [messages, setMessages] = useState<TChatMessage[]>([]);

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

          // 현재 보고 있는 채팅방의 메시지인 경우에만 상태 업데이트
          if (parsed.chatRoomId === chatRoomId) {
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
      console.log('WebSocket 비활성화중');
      client.deactivate();
      clientRef.current = null;
      setMessages([]);
    };
  }, [chatRoomId]);

  const sendMessage = (payload: TSendMessage) => {
    console.log('메세지 전송중:', payload);
    const token = useUserStore.getState().accessToken;
    clientRef.current?.publish({
      destination: '/pub/chat',
      headers: {Authorization: token ? `Bearer ${token}` : ''},
      body: JSON.stringify(payload),
    });
  };

  return {messages, sendMessage};
};
