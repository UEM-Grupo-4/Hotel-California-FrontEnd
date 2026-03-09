import { useState } from "react";
import type { Amenity, RoomType } from "../types/rooms";
import { useRooms, useRoomsAmenities, useRoomsTypes } from "../api/rooms";

export const useAdmin = () => {
  const { data: rooms = [] } = useRooms();
  const { data: amenities = [] } = useRoomsAmenities();
  const { data: roomsTypes = [] } = useRoomsTypes();

  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType | null>(null);
  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);

  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [isCreatingRoomType, setIsCreatingRoomType] = useState(false);
  const [isCreatingAmenity, setIsCreatingAmenity] = useState(false);

  const cleanRoomModal = () => {
    setSelectedRoomId(null);
    setIsCreatingRoom(false);
  };

  const cleanRoomTypeModal = () => {
    setSelectedRoomType(null);
    setIsCreatingRoomType(false);
  };

  const cleanAmenityModal = () => {
    setSelectedAmenity(null);
    setIsCreatingAmenity(false);
  };

  return {
    // valores
    rooms,
    roomsTypes,
    amenities,
    selectedRoomId,
    selectedRoomType,
    selectedAmenity,
    isCreatingRoom,
    isCreatingRoomType,
    isCreatingAmenity,

    // derived booleans
    isRoomModalOpen: selectedRoomId !== null || isCreatingRoom,
    isRoomTypeModalOpen: selectedRoomType !== null || isCreatingRoomType,
    isAmenityModalOpen: selectedAmenity !== null || isCreatingAmenity,

    // acciones edición
    openRoomModal: (id: number) => setSelectedRoomId(id),
    closeRoomModal: cleanRoomModal,

    openRoomTypeModal: (roomType: RoomType) => setSelectedRoomType(roomType),
    closeRoomTypeModal: cleanRoomTypeModal,

    openAmenityModal: (amenity: Amenity) => setSelectedAmenity(amenity),
    closeAmenityModal: cleanAmenityModal,

    // acciones creación
    startCreateRoom: () => setIsCreatingRoom(true),
    finishCreateRoom: () => setIsCreatingRoom(false),

    startCreateRoomType: () => setIsCreatingRoomType(true),
    finishCreateRoomType: () => setIsCreatingRoomType(false),

    startCreateAmenity: () => setIsCreatingAmenity(true),
    finishCreateAmenity: () => setIsCreatingAmenity(false),
  };
};
