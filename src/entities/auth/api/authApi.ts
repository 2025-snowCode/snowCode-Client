import {publicAxios} from '@/shared/api/axiosInstance';
import type {UserType} from '@/shared/model/type';
import {kakaoLoginResponseSchema} from '../model/schemas';

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
  const data = kakaoLoginResponseSchema.parse(response.data.response);
  return {
    userName: data.name,
    userType: (data.role === 'ADMIN' ? 'admin' : 'student') as Exclude<
      UserType,
      'guest'
    >,
    accessToken: data.accessToken,
  };
};
