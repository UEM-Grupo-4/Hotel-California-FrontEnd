import { useRoomsTypes } from "../api/rooms";

export const useAdminRoomsType = () => {
  const { data: roomsTypes } = useRoomsTypes();

  return {
    roomsTypes,
  };
};
