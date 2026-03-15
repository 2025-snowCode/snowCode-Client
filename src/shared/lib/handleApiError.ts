import axios from 'axios';

/**
 * API 에러를 사용자 친화적인 메시지로 변환
 */
export const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    if (status === 400) return '입력 정보를 확인해주세요.';
    if (status === 401) return '로그인이 필요합니다.';
    if (status === 403) return '접근 권한이 없습니다.';
    if (status === 404) return '요청한 정보를 찾을 수 없습니다.';
    if (status === 409) return '이미 존재하는 정보입니다.';
    if (status && status >= 500) return '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';

    return error.message || '요청 처리 중 오류가 발생했습니다.';
  }

  return '알 수 없는 오류가 발생했습니다.';
};

/**
 * API 에러를 처리하고 alert로 사용자에게 알림
 */
export const handleApiError = (error: unknown, fallbackMessage?: string): void => {
  const message = fallbackMessage ?? getApiErrorMessage(error);
  console.error(error);
  alert(message);
};
