import axios from 'axios';
import { errorResponseSchema } from '@/shared/model/schemas'; 

export const handleApiError = (error: unknown, fallbackMessage?: string): void => {
  let message = fallbackMessage;

  if (!message && axios.isAxiosError(error)) {
    // 서버가 준 구체적인 에러 메시지 시도
    const parsed = errorResponseSchema.safeParse(error.response?.data);
    if (parsed.success) {
      message = parsed.data.response.errorMessage;
    } else {
      // 서버 응답이 없거나 형식이 틀린 경우, Axios가 생성한 기본 메시지 사용
      message = error.message;
    }
  }

  // 로깅 (보안 로직 유지)
  if (import.meta.env.DEV) {
    console.error('[DEBUG_API_ERROR]', error);
  } else {
    const safeLog = axios.isAxiosError(error) 
      ? { status: error.response?.status, code: error.code } 
      : { message: 'Unexpected Error' };
    console.error('[API_ERROR]', safeLog);
  }

  // 최종 알림 (모두 실패했을 때만 최후의 메시지)
  alert(message || '요청 처리 중 오류가 발생했습니다.');
};
