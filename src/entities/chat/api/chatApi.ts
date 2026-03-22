import {privateAxios} from '@/shared/api/axiosInstance';
import {ENDPOINTS} from '@/shared/config/endpoints';
import type {
  TChatRoomListResponse,
  TChatRoomDetail,
} from '@/entities/chat/model/types';

export const getChatRooms = async (): Promise<TChatRoomListResponse> => {
  const res = await privateAxios.get(ENDPOINTS.CHATS.ROOT);
  return res.data.response;
};

export const getChatRoomDetail = async (
  chatRoomId: number
): Promise<TChatRoomDetail> => {
  const res = await privateAxios.get(ENDPOINTS.CHATS.DETAIL(chatRoomId));
  return res.data.response;
};
