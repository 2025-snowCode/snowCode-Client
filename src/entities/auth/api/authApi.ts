import {publicAxios} from '@/shared/api/axiosInstance';
import type {UserType} from '@/models/common';

interface KakaoLoginApiResponse {
  memberId: number;
  name: string;
  role: 'ADMIN' | 'USER';
  studentId: string;
  email: string;
  accessToken: string;
}

export const kakaoLogin = async (
  oAuthToken: string,
  role: 'ADMIN' | 'USER',
  studentId?: string
) => {
  const response = await publicAxios.post('/oauth2/authorization', {
    provider: 'KAKAO',
    role,
    ...(studentId && {studentId}),
    OAuthToken: oAuthToken,
  });
  const data: KakaoLoginApiResponse = response.data.response;
  return {
    userName: data.name,
    userType: (data.role === 'ADMIN' ? 'admin' : 'student') as Exclude<
      UserType,
      'guest'
    >,
    accessToken: data.accessToken,
  };
};
