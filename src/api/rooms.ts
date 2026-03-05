import { useQuery } from "@tanstack/react-query";
import { dataMockRooms } from "../mocks/dataMockRooms";
import type { Rooms } from "../types/rooms";

const getRoomsRequest = async (): Promise<Rooms[]> => {
  // TODO: Cambiar a la llamada al backend
  return await Promise.resolve(dataMockRooms);
  /*
    const { data } = await api.get(apiRoutes.rooms);

    return data;
  */
};

export const useRooms = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: getRoomsRequest
  });
};
