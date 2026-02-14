import axios from 'axios';
/**
 * 카카오 인증 관련 서비스
 */
export const kakaoService = {
  /**
   * 카카오 인가 코드 요청 URL 생성
   */
  getAuthUrl: (role: 'ADMIN' | 'USER', studentId: string) => {
    const state = `${role}:${studentId}`;
    return (
      `https://kauth.kakao.com/oauth/authorize` +
      `?client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}` +
      `&redirect_uri=${encodeURIComponent(import.meta.env.VITE_KAKAO_REDIRECT_URI)}` +
      `&response_type=code` +
      `&state=${encodeURIComponent(state)}`
    );
  },

  /**
   * 인가 코드로 액세스 토큰 받기
   */
  getAccessToken: async (code: string): Promise<string> => {
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
      redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
      code,
    });
    const response = await axios.post(
      'https://kauth.kakao.com/oauth/token',
      params,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    );
    return response.data.access_token;
  },
};
