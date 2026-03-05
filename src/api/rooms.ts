import { useQuery } from "@tanstack/react-query";
import { dataMockRooms } from "../mocks/dataMockRooms";
import type { Room } from "../types/rooms";

const getRoomsRequest = async (): Promise<Room[]> => {
  // TODO: Cambiar a la llamada al backend
  return await Promise.resolve(dataMockRooms);
  /*
    const { data } = await api.get(apiRoutes.rooms);

    return data;
  */
};

const getRoomByIdRequest = async (roomId: number): Promise<Room> => {
  const room = await Promise.resolve(dataMockRooms.find((room) => room.id === roomId));
  if (!room) return dataMockRooms[0];

  return room;
};

export const useRooms = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: getRoomsRequest,
  });
};

export const useGetRoom = (roomId: number) => {
  return useQuery({
    queryKey: ["room", roomId],
    queryFn: () => getRoomByIdRequest(roomId),
  });
};
