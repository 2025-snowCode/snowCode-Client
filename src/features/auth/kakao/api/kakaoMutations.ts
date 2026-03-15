import {kakaoService} from '@/features/auth/kakao/lib/kakaoService';
import {kakaoLogin} from '@/entities/auth/api/authApi';

interface KakaoLoginParams {
  code: string;
  role: 'ADMIN' | 'USER';
  studentId: string;
}

export const kakaoMutations = {
  kakaoLogin: {
    mutationKey: ['kakaoLogin'],
    mutationFn: async ({code, role, studentId}: KakaoLoginParams) => {
      const kakaoAccessToken = await kakaoService.getAccessToken(code);
      return kakaoLogin(kakaoAccessToken, role, studentId);
    },
  },
};
