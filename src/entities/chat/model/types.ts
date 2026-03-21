import {z} from 'zod';
import {
  messageTypeSchema,
  chatRoomSummarySchema,
  chatRoomListResponseSchema,
  chatMessageSchema,
  chatRoomDetailSchema,
  sendMessageSchema,
} from '@/entities/chat/model/schemas';

export type TMessageType = z.infer<typeof messageTypeSchema>;
export type TChatRoomSummary = z.infer<typeof chatRoomSummarySchema>;
export type TChatRoomListResponse = z.infer<typeof chatRoomListResponseSchema>;
export type TChatMessage = z.infer<typeof chatMessageSchema>;
export type TChatRoomDetail = z.infer<typeof chatRoomDetailSchema>;
export type TSendMessage = z.infer<typeof sendMessageSchema>;
