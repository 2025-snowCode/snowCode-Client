import {useMutation} from '@tanstack/react-query';
import {kakaoService} from '@/features/auth/kakao/lib/kakaoService';
import {kakaoLogin} from '@/entities/auth/api/authApi';

interface KakaoLoginParams {
  code: string;
  role: 'ADMIN' | 'USER';
  studentId: string;
}

/**
 * 카카오 로그인 뮤테이션 훅
 */
export const useKakaoMutation = () => {
  return useMutation({
    mutationFn: async ({code, role, studentId}: KakaoLoginParams) => {
      const kakaoAccessToken = await kakaoService.getAccessToken(code);
      return kakaoLogin(kakaoAccessToken, role, studentId);
    },
  });
};
