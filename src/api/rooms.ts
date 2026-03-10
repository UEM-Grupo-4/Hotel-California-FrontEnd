import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { dataMockRooms } from "../mocks/dataMockRooms";
import type { Amenity, AmenityRequest, Room, RoomType } from "../types/rooms";
import { api } from "./axios";
import { apiRoutes } from "./apiRoutes";

const getRoomsRequest = async (): Promise<Room[]> => {
  const { data } = await api.get(apiRoutes.rooms);

  return data;
};

const getRoomsAmenitiesRequest = async (): Promise<Amenity[]> => {
  const { data } = await api.get(apiRoutes.roomsAmenities);

  return data;
};

const getRoomsTypesRequest = async (): Promise<RoomType[]> => {
  const { data } = await api.get(apiRoutes.roomsType);

  return data;
};

export const useRooms = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: getRoomsRequest,
  });
};

export const useRoomsTypes = () => {
  return useQuery({
    queryKey: ["rooms-types"],
    queryFn: () => getRoomsTypesRequest(),
  });
};

export const useRoomsAmenities = () => {
  return useQuery({
    queryKey: ["amenities"],
    queryFn: () => getRoomsAmenitiesRequest(),
  });
};

// GET BY ID

const getRoomByIdRequest = async (roomId: number): Promise<Room> => {
  const room = await Promise.resolve(dataMockRooms.find((room) => room.id === roomId));
  if (!room) return dataMockRooms[0];

  return room;
};

// TODO: Fix this
const getAmenitiesForRoomType = async (roomType: number): Promise<Amenity[]> => {
  const { data } = await api.get(`${apiRoutes.roomsAmenities}/${roomType}`);

  return data;
};

export const useGetRoom = (roomId: number) => {
  return useQuery({
    queryKey: ["room", roomId],
    queryFn: () => getRoomByIdRequest(roomId),
  });
};

export const useGetAmenitiesByRoomType = (roomTypeId: number) => {
  return useQuery({
    queryKey: ["room-type", roomTypeId],
    queryFn: () => getAmenitiesForRoomType(roomTypeId),
  });
};

// Create

const createAmenityRequest = async (amenity: AmenityRequest) => {
  return await api.post(apiRoutes.roomsAmenities, amenity);
};

const updateAmenityRequest = async (amenity: Amenity) => {
  return await api.patch(`${apiRoutes.roomsAmenities}/${amenity.id}/`, amenity);
};

export const useCreateAmenity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (amenity: AmenityRequest) => createAmenityRequest(amenity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["amenities"] });
    },
  });
};

export const useUpdateAmenity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (amenity: Amenity) => updateAmenityRequest(amenity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["amenities"] });
    },
  });
};
