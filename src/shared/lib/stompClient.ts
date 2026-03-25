import {Client} from '@stomp/stompjs';
import {useUserStore} from '@/entities/auth/model/useUserStore';

export const createStompClient = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const brokerURL = baseURL.replace('http', 'ws') + '/stomp';

  return new Client({
    brokerURL: brokerURL,
    beforeConnect: (client) => {
      const token = useUserStore.getState().accessToken;
      client.brokerURL = `${brokerURL}?token=${token || ''}`;
      client.connectHeaders = {
        Authorization: token || '',
      };
    },
    reconnectDelay: 5000,
  });
};
