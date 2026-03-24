import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {useUserStore} from '@/entities/auth/model/useUserStore';

export const createStompClient = () => {
  return new Client({
    webSocketFactory: () => new SockJS('/ws/stomp'),
    beforeConnect: (client) => {
      client.connectHeaders = {
        Authorization: `Bearer ${useUserStore.getState().accessToken}`,
      };
    },
    reconnectDelay: 5000,
  });
};
