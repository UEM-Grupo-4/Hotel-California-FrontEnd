import type {
  ConversationChat,
  PayloadCreateConversation,
  PayloadSendMessage,
} from "../types/messages";
import type {
  Amenity,
  AmenityRequest,
  Booking,
  MyBookReservation,
  Room,
  RoomFiltersParams,
  RoomType,
  RoomTypeRequest,
} from "../types/rooms";
import { mapBookingToApi, type CreateRoomBookingExtra } from "../utils/roomsUtils";
import { apiRoutes } from "./apiRoutes";
import { api } from "./axios";

export const getRooms = async (): Promise<Room[]> => {
  const { data } = await api.get(apiRoutes.rooms);

  return data;
};

export const getRoomTypes = async (): Promise<RoomType[]> => {
  const { data } = await api.get(apiRoutes.roomsType);

  return data;
};

export const getAmenities = async (): Promise<Amenity[]> => {
  const { data } = await api.get(apiRoutes.roomsAmenities);

  return data;
};

export const getRoomsByAvailability = async ({
  startDate,
  endDate,
  people,
}: RoomFiltersParams): Promise<Room[]> => {
  const { data } = await api.get(
    `${apiRoutes.bookingsAvailableRooms}?fecha_inicio=${startDate}&fecha_fin=${endDate}&huespedes=${people}`,
  );

  return data;
};

export const getBookingByCode = async ({ code, email }: MyBookReservation): Promise<Booking> => {
  const { data } = await api.get(`${apiRoutes.bookMyRoom}?code=${code}&email=${email}`);

  return data;
};

export const getBookingReservations = async (): Promise<Booking[]> => {
  const { data } = await api.get(apiRoutes.bookingsList);

  return data;
};

export const createRoom = async (formData: FormData) => {
  return api.post(apiRoutes.rooms, formData);
};

export const createRoomType = async (roomType: RoomTypeRequest) => {
  return api.post(apiRoutes.roomsType, roomType);
};

export const createAmenity = async (amenity: AmenityRequest) => {
  return api.post(apiRoutes.roomsAmenities, amenity);
};

export const createRoomBooking = async ({
  form,
  roomId,
  startDate,
  endDate,
}: CreateRoomBookingExtra) => {
  const payload = mapBookingToApi(form, {
    roomId,
    startDate,
    endDate,
  });

  const { data } = await api.post(apiRoutes.bookingsReservationRoom, payload);

  return data;
};

// UPDATE
export const updateRoom = async (id: number, formData: FormData) => {
  return api.patch(`${apiRoutes.rooms}${id}/`, formData);
};

export const updateRoomType = async (roomType: RoomType) => {
  return api.patch(`${apiRoutes.roomsType}${roomType.id}/`, roomType);
};

export const updateAmenity = async (amenity: Amenity) => {
  return api.patch(`${apiRoutes.roomsAmenities}${amenity.id}/`, amenity);
};

export const deleteRoom = async (id: number) => {
  return api.delete(`${apiRoutes.rooms}${id}/`);
};

export const deleteRoomType = async (id: number) => {
  return api.delete(`${apiRoutes.roomsType}${id}/`);
};

export const deleteAmenity = async (id: number) => {
  return api.delete(`${apiRoutes.roomsAmenities}${id}/`);
};

// ACCEPT / REJECT BOOKING

export const acceptBooking = async (id: number) => {
  return api.post(apiRoutes.acceptBooking.replace("{id}", String(id)));
};

export const rejectBooking = async (id: number) => {
  return api.post(apiRoutes.rejectBooking.replace("{id}", String(id)));
};

// Chat

export const openConversation = async (payload: PayloadCreateConversation) => {
  return api.post(apiRoutes.conversations, payload);
};

export const getMessagesRequest = async (conversationId: number): Promise<ConversationChat> => {
  const { data } = await api.get(`${apiRoutes.conversations}${conversationId}`);

  return data;
};

export const getAllMessagesRequest = async (): Promise<ConversationChat[]> => {
  const { data } = await api.get(apiRoutes.conversations);

  return data;
};

export const sendMessage = async (payload: PayloadSendMessage) => {
  return api.post(apiRoutes.messages, payload);
};

export const closeConversation = async (conversationId: number) => {
  return api.patch(`${apiRoutes.chat}${conversationId}/close/`);
};
