import {useMutation} from '@tanstack/react-query';
import {kakaoService} from '@/features/auth/kakao/lib/kakaoService';
import {kakaoLogin} from '@/entities/auth/api/authApi';
import type {ApiResponse} from '@/shared/model/types';
import type {KakaoLoginApiResponse} from '@/entities/auth/model/types';

interface KakaoLoginParams {
  code: string;
  role: 'ADMIN' | 'USER';
  studentId: string;
}

interface KakaoMutationOptions {
  onSuccess?: (data: ApiResponse<KakaoLoginApiResponse>) => void;
  onError?: (error: Error) => void;
}

/**
 * 카카오 로그인 뮤테이션 훅
 */
export const useKakaoMutation = (options?: KakaoMutationOptions) => {
  return useMutation({
    mutationFn: async ({code, role, studentId}: KakaoLoginParams) => {
      const kakaoAccessToken = await kakaoService.getAccessToken(code);
      return kakaoLogin(kakaoAccessToken, role, studentId);
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
};
