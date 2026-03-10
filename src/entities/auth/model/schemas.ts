import {z} from 'zod';

export const kakaoLoginResponseSchema = z.object({
  memberId: z.number(),
  name: z.string(),
  role: z.enum(['ADMIN', 'USER']),
  studentId: z.string(),
  email: z.string().nullable(),
  accessToken: z.string(),
});
