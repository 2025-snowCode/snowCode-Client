import {z} from 'zod';

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

export type KakaoLoginApiResponse = z.infer<typeof kakaoLoginApiResponseSchema>;
