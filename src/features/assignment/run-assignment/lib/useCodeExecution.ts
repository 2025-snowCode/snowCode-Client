import {useUserStore} from '@/entities/auth/model/useUserStore';
import {apiResponseSchema} from '@/shared/model';
import {useEffect, useRef, useState} from 'react';
import z from 'zod';

export const useCodeExecution = () => {
  const {accessToken} = useUserStore();
  const socketRef = useRef<WebSocket | null>(null);
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runCode = (code: string, input: string) => {
    const ws = new WebSocket(
      `${import.meta.env.VITE_WS_BASE_URL}?token=${accessToken}`
    );
    socketRef.current = ws;
    setIsRunning(true);

    // 웹소켓 연결 시 코드와 입력값 전송
    ws.onopen = () => ws.send(JSON.stringify({code, input}));

    // 메시지 수신
    ws.onmessage = (event) => {
      console.log('웹소켓 메시지 수신', event.data);
      if (event.data === '연결 완료') return;
      const data = JSON.parse(event.data);
      const parsed = apiResponseSchema(z.string()).parse(data);
      setOutput(parsed.response);
      ws.close();
    };

    // 에러 처리
    ws.onerror = (error) => console.error('웹소켓 error', error);

    // 연결 종료 처리
    ws.onclose = () => {
      console.log('웹소켓 연결 종료');
      setIsRunning(false);
    };
  };

  // 언마운트 시 웹소켓 연결 종료
  useEffect(() => {
    return () => socketRef.current?.close();
  }, []);

  return {output, runCode, isRunning};
};
