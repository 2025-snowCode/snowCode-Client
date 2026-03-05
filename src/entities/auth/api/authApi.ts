import {publicAxios} from '@/shared/api/axiosInstance';
import type {ApiResponse} from '@/shared/model/common';
import {
  kakaoLoginApiResponseSchema,
  type KakaoLoginApiResponse,
} from '@/entities/auth/model/types';

export const kakaoLogin = async (
  oAuthToken: string,
  role: 'ADMIN' | 'USER',
  studentId?: string
): Promise<ApiResponse<KakaoLoginApiResponse>> => {
  const response = await publicAxios.post('/oauth2/authorization', {
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
