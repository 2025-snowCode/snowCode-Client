import {publicAxios} from '@/shared/api/axiosInstance';
import type {ApiResponse} from '@/shared/model/types';
import {
  kakaoLoginApiResponseSchema,
  type KakaoLoginApiResponse,
} from '@/entities/auth/model/types';
import {ENDPOINTS} from '@/shared/config/endpoints';

export const kakaoLogin = async (
  oAuthToken: string,
  role: 'ADMIN' | 'USER',
  studentId?: string
): Promise<ApiResponse<KakaoLoginApiResponse>> => {
  const response = await publicAxios.post(ENDPOINTS.AUTH.KAKAO_LOGIN, {
    provider: 'KAKAO',
    role,
    ...(studentId && {studentId}),
    OAuthToken: oAuthToken,
  });
  return {
    ...response.data,
    response: kakaoLoginApiResponseSchema.parse(response.data.response),
  };
};
