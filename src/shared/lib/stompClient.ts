import {Client} from '@stomp/stompjs';
import {useUserStore} from '@/entities/auth/model/useUserStore';

export const createStompClient = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const brokerURL = baseURL.replace('http', 'ws') + '/ws/stomp';

  return new Client({
    brokerURL: brokerURL,
    beforeConnect: (client) => {
      // Bearer 접두사 없이 순수 토큰만 전달 (백엔드 인터셉터 요구사항)
      const token = useUserStore.getState().accessToken;
      client.connectHeaders = {
        Authorization: token || '',
      };
    },
    reconnectDelay: 5000,
  });
};
