import {useQuery} from '@tanstack/react-query';
import {getChatRooms, getChatRoomDetail} from '@/entities/chat/api/chatApi';

export const useChatRooms = () => {
  return useQuery({
    queryKey: ['chatRooms'],
    queryFn: getChatRooms,
  });
};

export const useChatRoomDetail = (chatRoomId: number | null) => {
  return useQuery({
    queryKey: ['chatRoomDetail', chatRoomId],
    queryFn: () => getChatRoomDetail(chatRoomId!),
    enabled: chatRoomId !== null,
  });
};
