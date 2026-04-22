import type { EventRequest, RoomRequest, RoomUpdate } from "../types/rooms";

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

export const buildEventToApi = (event: EventRequest) => {
  const formData = new FormData();

  formData.append("nombre", event.name);
  formData.append("capacidad", String(event.capacity));
  formData.append("descripcion", event.description);
  formData.append("precio_hora", String(event.pricePerHour));
  formData.append("estado", event.status);

  if (event.image) {
    formData.append("image", event.image);
  }

  return formData;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const buildEventToApp = (data: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data?.map((event: any) => ({
    id: event.id,
    name: event.nombre,
    capacity: event.capacidad,
    description: event.descripcion,
    pricePerHour: event.precio_hora,
    status: event.estado,
    times: event.horarios,
    image: event.image,
  }));
};
