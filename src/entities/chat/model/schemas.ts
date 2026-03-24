import {z} from 'zod';

export const messageTypeSchema = z.enum(['TEXT', 'CODE']);

/** 채팅방 목록 아이템 스키마 */
export const chatRoomSummarySchema = z.object({
  chatRoomId: z.number(),
  opponentMemberId: z.number(),
  studentId: z.string().nullable(),
  name: z.string(),
  lastMessage: z.string().nullable(),
  lastSentAt: z.string().nullable(),
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
  size: z.number().nullish().transform(v => v ?? 0),
  messages: z.array(chatMessageSchema).nullish().transform(v => v ?? []),
});

/** 웹소켓 메시지 수신 스키마 (백엔드 ChatMessageResponse 대응) */
export const socketMessageResponseSchema = z.object({
  type: messageTypeSchema,
  chatRoomId: z.number(),
  senderId: z.number(),
  content: z.string(),
  sendAt: z.string(),
});

/** 웹소켓 메시지 전송 스키마 */
export const sendMessageSchema = z.object({
  type: messageTypeSchema,
  chatRoomId: z.number(),
  receiverId: z.number(),
  content: z.string(),
});

export type TMessageType = z.infer<typeof messageTypeSchema>;
export type TChatRoomSummary = z.infer<typeof chatRoomSummarySchema>;
export type TChatRoomListResponse = z.infer<typeof chatRoomListResponseSchema>;
export type TChatMessage = z.infer<typeof chatMessageSchema>;
export type TChatRoomDetail = z.infer<typeof chatRoomDetailSchema>;
export type TSendMessage = z.infer<typeof sendMessageSchema>;
export type TSocketMessageResponse = z.infer<typeof socketMessageResponseSchema>;
