import {privateAxios} from '@/shared/api/axiosInstance';
import {ENDPOINTS} from '@/shared/config/endpoints';
import {apiResponseSchema} from '@/shared/model/schemas';
import {
  chatRoomListResponseSchema,
  chatRoomDetailSchema,
} from '@/entities/chat/model/schemas';

export const getChatRooms = async () => {
  const res = await privateAxios.get(ENDPOINTS.CHATS.ROOT);
  return apiResponseSchema(chatRoomListResponseSchema).parse(res.data).response;
};

export const getChatRoomDetail = async (chatRoomId: number) => {
  const res = await privateAxios.get(ENDPOINTS.CHATS.DETAIL(chatRoomId));
  return apiResponseSchema(chatRoomDetailSchema).parse(res.data).response;
};
