import {z} from 'zod';
import type {UserType} from '@/shared/model/common';

/**
 * 카카오 로그인 API 응답 스키마
 */
export const kakaoLoginApiResponseSchema = z.object({
  memberId: z.number(),
  name: z.string(),
  role: z.enum(['ADMIN', 'USER']),
  studentId: z.string().nullable(),
  email: z.string().nullable(),
  provider: z.string(),
  accessToken: z.string(),
});

/**
 * 로그인 후 앱에서 사용하는 사용자 정보
 */
export interface LoginResult {
  userName: string;
  userType: Exclude<UserType, 'guest'>;
  accessToken: string;
}

export type KakaoLoginApiResponse = z.infer<typeof kakaoLoginApiResponseSchema>;
