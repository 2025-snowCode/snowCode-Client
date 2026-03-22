import {queryOptions} from '@tanstack/react-query';
import {getChatRooms, getChatRoomDetail} from '@/entities/chat/api/chatApi';

export const chatQueries = {
  getChatRooms: () =>
    queryOptions({
      queryKey: ['chatRooms'],
      queryFn: getChatRooms,
    }),

  getChatRoomDetail: (chatRoomId: number | null) =>
    queryOptions({
      queryKey: ['chatRoom', chatRoomId],
      queryFn: () => getChatRoomDetail(chatRoomId!),
      enabled: chatRoomId !== null,
    }),
};
