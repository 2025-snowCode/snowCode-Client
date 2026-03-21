import {z} from 'zod';

export const messageTypeSchema = z.enum(['TEXT', 'CODE']);

/** 채팅방 목록 아이템 스키마 */
export const chatRoomSummarySchema = z.object({
  chatRoomId: z.number(),
  opponentMemberId: z.number(),
  studentId: z.string(),
  name: z.string(),
  lastMessage: z.string(),
  lastSentAt: z.string(),
});

/** 채팅방 목록 응답 스키마 */
export const chatRoomListResponseSchema = z.object({
  count: z.number(),
  chatRoomList: z.array(chatRoomSummarySchema),
});

/** 메시지 스키마 */
export const chatMessageSchema = z.object({
  messageId: z.number(),
  memberId: z.number(),
  messageType: messageTypeSchema,
  content: z.string(),
  sendAt: z.string(),
});

/** 채팅방 상세 응답 스키마 */
export const chatRoomDetailSchema = z.object({
  chatRoomId: z.number(),
  opponentId: z.number(),
  opponentStudentId: z.string().nullable(),
  opponentName: z.string(),
  size: z.number(),
  messages: z.array(chatMessageSchema),
});

/** 웹소켓 메시지 전송 스키마 */
export const sendMessageSchema = z.object({
  type: messageTypeSchema,
  content: z.string(),
});
