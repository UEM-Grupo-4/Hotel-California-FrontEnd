import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Amenity,
  RoomType,
  AmenityRequest,
  Room,
  RoomTypeRequest,
  RoomRequest,
  RoomUpdate,
} from "../types/rooms";
import { api } from "./axios";
import { apiRoutes } from "./apiRoutes";
import { showError } from "../utils/showNotification";

const buildRoomToApi = (room: RoomUpdate | RoomRequest) => {
  const formData = new FormData();

  formData.append("number", room.number);
  formData.append("description", room.description);
  formData.append("type", String(room.type));

  if (room.image) {
    formData.append("image", room.image);
  }

  return formData;
};

const getRoomsRequest = async (): Promise<Room[]> => {
  try {
    const { data } = await api.get(apiRoutes.rooms);

    return data;
  } catch (error) {
    showError("Hubo un error obteniendo las habitaciones");
    console.error(error);

    throw new Error("Hubo un error obteniendo las habitaciones");
  }
};

const getRoomsAmenitiesRequest = async (): Promise<RoomType[]> => {
  try {
    const { data } = await api.get(apiRoutes.roomsAmenities);

    return data;
  } catch (error) {
    showError("Hubo un error obteniendo los amenities");
    console.error(error);

    throw new Error("Hubo un error obteniendo los amenities");
  }
};

const getRoomsTypesRequest = async (): Promise<RoomType[]> => {
  try {
    const { data } = await api.get(apiRoutes.roomsType);

    return data;
  } catch (error) {
    showError("Hubo un error obteniendo los room type");
    console.error(error);

    throw new Error("Hubo un error obteniendo los room type");
  }
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

// Create
const createRoomRequest = async (room: FormData) => {
  return await api.post(apiRoutes.rooms, room);
};

const createRoomTypeRequest = async (roomType: AmenityRequest) => {
  return await api.post(apiRoutes.roomsType, roomType);
};

const createAmenityRequest = async (amenity: AmenityRequest) => {
  return await api.post(apiRoutes.roomsAmenities, amenity);
};

export const useCreateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (room: RoomRequest) => {
      const formData = buildRoomToApi(room);

      return createRoomRequest(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: () => {
      showError("Hubo un error creando la habitación");
    },
  });
};

export const useCreateRoomType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roomType: RoomTypeRequest) => createRoomTypeRequest(roomType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms-types"] });
    },
    onError: () => {
      showError("Hubo un error creando el room type");
    },
  });
};

export const useCreateAmenity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (amenity: AmenityRequest) => createAmenityRequest(amenity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["amenities"] });
    },
    onError: () => {
      showError("Hubo un error creando el amenity");
    },
  });
};

// Update
const updateRoomRequest = async (id: number, room: FormData) => {
  return await api.patch(`${apiRoutes.rooms}${id}/`, room);
};

const updateRoomTypeRequest = async (roomType: RoomType) => {
  return await api.patch(`${apiRoutes.roomsType}${roomType.id}/`, roomType);
};

const updateAmenityRequest = async (amenity: Amenity) => {
  return await api.patch(`${apiRoutes.roomsAmenities}${amenity.id}/`, amenity);
};

export const useUpdateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (room: RoomUpdate) => {
      const formData = buildRoomToApi(room);

      return updateRoomRequest(room.id, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: () => {
      showError("Hubo un error actualizando la habitación");
    },
  });
};

export const useUpdateRoomType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roomType: RoomType) => updateRoomTypeRequest(roomType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms-types"] });
    },
    onError: () => {
      showError("Hubo un error actualizando el room type");
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
    onError: () => {
      showError("Hubo un error actualizando el amenity");
    },
  });
};
