import {publicAxios} from '@/shared/api/axiosInstance';
import {
  kakaoLoginApiResponseSchema,
  type KakaoLoginApiResponse,
} from '@/entities/auth/model/types';
import {ENDPOINTS} from '@/shared/config/endpoints';

export const kakaoLogin = async (
  oAuthToken: string,
  role: 'ADMIN' | 'USER',
  studentId?: string
): Promise<KakaoLoginApiResponse> => {
  const response = await publicAxios.post(ENDPOINTS.AUTH.KAKAO_LOGIN, {
    provider: 'KAKAO',
    role,
    ...(studentId && {studentId}),
    OAuthToken: oAuthToken,
  });
  return kakaoLoginApiResponseSchema.parse(response.data.response);
};

export interface LocalLoginParams {
  name: string;
  role: 'ADMIN' | 'USER';
  studentId?: string;
  email: string;
  oAuthToken: string;
}

export const localLogin = async (
  params: LocalLoginParams
): Promise<KakaoLoginApiResponse> => {
  const response = await publicAxios.post(ENDPOINTS.AUTH.KAKAO_LOGIN, {
    provider: 'LOCAL',
    name: params.name,
    role: params.role,
    ...(params.studentId && {studentId: params.studentId}),
    email: params.email,
    OAuthToken: params.oAuthToken,
  });
  return kakaoLoginApiResponseSchema.parse(response.data.response);
};
