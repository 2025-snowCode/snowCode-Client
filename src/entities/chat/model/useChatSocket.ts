import {useEffect, useRef, useState} from 'react';
import type {Client} from '@stomp/stompjs';
import {createStompClient} from '@/shared/lib/stompClient';
import type {TChatMessage, TSendMessage} from '@/entities/chat/model/types';

export const useChatSocket = (chatRoomId: number | null) => {
  const clientRef = useRef<Client | null>(null);
  const [messages, setMessages] = useState<TChatMessage[]>([]);

  useEffect(() => {
    if (!chatRoomId) return;

    const client = createStompClient();

    client.onConnect = () => {
      client.subscribe(`/sub/chat/${chatRoomId}`, (frame) => {
        const message: TChatMessage = JSON.parse(frame.body);
        setMessages((prev) => [...prev, message]);
      });
    };

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
      clientRef.current = null;
      setMessages([]);
    };
  }, [chatRoomId]);

  const sendMessage = (payload: TSendMessage) => {
    clientRef.current?.publish({
      destination: `/pub/chat/${chatRoomId}`,
      body: JSON.stringify(payload),
    });
  };

  return {messages, sendMessage};
};
