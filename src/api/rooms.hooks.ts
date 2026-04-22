import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "./rooms.api";
import { eventKeys, roomsKeys } from "./rooms.keys";
import { buildRoomToApi } from "./rooms.mappers";
import type {
  Amenity,
  AmenityRequest,
  Booking,
  EventFilterParams,
  EventRequest,
  EventSchedule,
  EventUpdate,
  RoomFiltersParams,
  RoomRequest,
  RoomType,
  RoomTypeRequest,
  RoomUpdate,
} from "../types/rooms";
import { showError } from "../utils/showNotification";
import type { PayloadCreateConversation, PayloadSendMessage } from "../types/messages";

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

export const useEventByAvailability = (
  params: EventFilterParams,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: eventKeys.byAvailability(params),
    queryFn: () => api.getEventsByAvailability(params),
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

export const useEvents = () => {
  return useQuery({
    queryKey: eventKeys.events,
    queryFn: api.getEvents,
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

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (event: EventRequest) => api.createEvent(event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventKeys.events });
    },
  });
};

export const useCreateEventSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (time: EventSchedule[]) => api.createEventSchedule(time),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventKeys.events });
    },
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

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (event: EventUpdate) => api.updateEvent(event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventKeys.events });
    },
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

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventKeys.events });
    },
  });
};

// ACCEPT / REJECT BOOKING

export const useAcceptBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (booking: Booking) => api.acceptBooking(booking.id),
    onSuccess: (_data, variable) => {
      queryClient.invalidateQueries({ queryKey: roomsKeys.bookingsApprovals });
      queryClient.invalidateQueries({
        queryKey: roomsKeys.booking(variable.code, variable.cliente?.email),
      });
    },
    onError: () => {
      showError("Error aceptando solicitud");
    },
  });
};

export const useRejectBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (booking: Booking) => api.rejectBooking(booking.id),
    onSuccess: (_data, variable) => {
      queryClient.invalidateQueries({ queryKey: roomsKeys.bookingsApprovals });
      queryClient.invalidateQueries({
        queryKey: roomsKeys.booking(variable.code, variable.cliente?.email),
      });
    },
    onError: () => {
      showError("Error rechazando solicitud");
    },
  });
};

// Chat

export const useOpenConversation = () => {
  //const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PayloadCreateConversation) => api.openConversation(payload),
    onError: () => {
      showError("Hubo un error en tu petición");
    },
  });
};

export const useMessages = (conversationId: number) => {
  return useQuery({
    queryKey: roomsKeys.messagesByConversationId(conversationId),
    queryFn: () => api.getMessagesRequest(conversationId),
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PayloadSendMessage) => api.sendMessage(payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: roomsKeys.messagesByConversationId(variables?.conversation),
      });
    },
  });
};

export const useConversations = () => {
  return useQuery({
    queryKey: roomsKeys.conversations,
    queryFn: () => api.getAllMessagesRequest(),
  });
};

export const useCloseChat = () => {
  return useMutation({
    mutationFn: (conversationId: number) => api.closeConversation(conversationId),
  });
};
