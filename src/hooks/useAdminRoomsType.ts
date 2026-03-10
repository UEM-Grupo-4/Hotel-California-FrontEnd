import { useState } from "react";
import { useRoomsTypes } from "../api/rooms";
import type { RoomType } from "../types/rooms";

export const useAdminRoomsTypes = () => {
  const { data: roomsTypes = [] } = useRoomsTypes();

  const [selectedRoomType, setSelectedRoomType] = useState<RoomType | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const openCreate = () => {
    setSelectedRoomType(null);
    setIsCreating(true);
  };

  const openEdit = (roomType: RoomType) => {
    setSelectedRoomType(roomType);
    setIsCreating(false);
  };

  const closeModal = () => {
    setSelectedRoomType(null);
    setIsCreating(false);
  };

  return {
    roomsTypes,
    selectedRoomType,
    isModalOpen: isCreating || !!selectedRoomType,
    openCreate,
    openEdit,
    closeModal,
  };
};
