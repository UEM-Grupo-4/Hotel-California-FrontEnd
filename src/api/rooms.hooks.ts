import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "./rooms.api";
import { roomsKeys } from "./rooms.keys";
import { buildRoomToApi } from "./rooms.mappers";
import type {
  Amenity,
  AmenityRequest,
  RoomFiltersParams,
  RoomRequest,
  RoomType,
  RoomTypeRequest,
  RoomUpdate,
} from "../types/rooms";
import { showError } from "../utils/showNotification";

// GETS
export const useRooms = () => {
  return useQuery({
    queryKey: roomsKeys.all,
    queryFn: api.getRooms,
  });
};

export const useRoomsTypes = () => {
  return useQuery({
    queryKey: roomsKeys.types,
    queryFn: api.getRoomTypes,
  });
};

export const useRoomsAmenities = () => {
  return useQuery({
    queryKey: roomsKeys.amenities,
    queryFn: api.getAmenities,
  });
};

export const useRoomsByAvailability = (
  params: RoomFiltersParams,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: roomsKeys.byAvailability(params),
    queryFn: () => api.getRoomsByAvailability(params),
    enabled: options?.enabled,
  });
};

export const useBookingByCode = (code?: string, email?: string) => {
  return useQuery({
    queryKey: roomsKeys.booking(code, email),
    queryFn: () => api.getBookingByCode({ code, email }),
    enabled: false,
    retry: false,
  });
};

export const useBookings = () => {
  return useQuery({
    queryKey: roomsKeys.bookingsApprovals,
    queryFn: () => api.getBookingReservations(),
  });
};

// CREATE
export const useCreateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (room: RoomRequest) => api.createRoom(buildRoomToApi(room)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomsKeys.all });
    },
    onError: () => showError("Hubo un error creando la habitación"),
  });
};

export const useCreateRoomType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roomType: RoomTypeRequest) => api.createRoomType(roomType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomsKeys.types });
    },
    onError: () => showError("Error creando room type"),
  });
};

export const useCreateAmenity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (amenity: AmenityRequest) => api.createAmenity(amenity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomsKeys.amenities });
    },
    onError: () => showError("Error creando amenity"),
  });
};

export const useCreateRoomBooking = () => {
  return useMutation({
    mutationFn: api.createRoomBooking,
  });
};

// UPDATE
export const useUpdateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (room: RoomUpdate) => api.updateRoom(room.id, buildRoomToApi(room)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomsKeys.all });
    },
    onError: () => showError("Error actualizando habitación"),
  });
};

export const useUpdateRoomType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roomType: RoomType) => api.updateRoomType(roomType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomsKeys.types });
    },
    onError: () => showError("Error actualizando room type"),
  });
};

export const useUpdateAmenity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (amenity: Amenity) => api.updateAmenity(amenity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomsKeys.amenities });
    },
    onError: () => showError("Error actualizando amenity"),
  });
};

// DELETE 🔥
export const useDeleteRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.deleteRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomsKeys.all });
    },
  });
};

export const useDeleteRoomType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.deleteRoomType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomsKeys.types });
    },
  });
};

export const useDeleteAmenity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.deleteAmenity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomsKeys.amenities });
    },
  });
};
