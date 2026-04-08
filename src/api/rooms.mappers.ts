import type { RoomRequest, RoomUpdate } from "../types/rooms";

export const buildRoomToApi = (room: RoomUpdate | RoomRequest) => {
  const formData = new FormData();

  formData.append("number", room.number);
  formData.append("description", room.description);
  formData.append("type", String(room.type));

  if (room.image) {
    formData.append("image", room.image);
  }

  return formData;
};
