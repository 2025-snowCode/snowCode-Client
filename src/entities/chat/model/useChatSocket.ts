import {useEffect, useRef, useState} from 'react';
import type {Client, IFrame} from '@stomp/stompjs';
import {createStompClient} from '@/shared/lib/stompClient';
import {socketMessageResponseSchema} from '@/entities/chat/model/schemas';
import type {TChatMessage, TSendMessage} from '@/entities/chat/model/schemas';

export const useChatSocket = (chatRoomId: number | null) => {
  const clientRef = useRef<Client | null>(null);
  const [messages, setMessages] = useState<TChatMessage[]>([]);

  useEffect(() => {
    if (!chatRoomId) return;

    const client = createStompClient();

    client.onConnect = (frame: IFrame) => { 
      console.log('Connected to WebSocket:', frame);
      
      client.subscribe('/user/queue/messages', (frame: IFrame) => {
        try {
          const rawData = JSON.parse(frame.body);
          const parsed = socketMessageResponseSchema.parse(rawData);

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
          console.error('Failed to parse chat message:', error);
        }
      });
    };

    client.onStompError = (frame: IFrame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    client.activate();
    clientRef.current = client;

    return () => {
      console.log('WebSocket 비활성화 중');
      client.deactivate();
      clientRef.current = null;
      setMessages([]);
    };
  }, [chatRoomId]);

  const sendMessage = (payload: TSendMessage) => {
    if (clientRef.current && clientRef.current.connected) {
      console.log('메시지 전송 중:', payload);
      clientRef.current.publish({
        destination: '/pub/chat',
        body: JSON.stringify(payload),
      });
    } else {
      console.error('WebSocket이 연결되어 있지 않습니다.');
    }
  };

  return {messages, sendMessage};
};