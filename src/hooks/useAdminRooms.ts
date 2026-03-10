import { useState } from "react";
import { useRooms } from "../api/rooms";
import type { Room } from "../types/rooms";

export const useAdminRooms = () => {
  const { data: rooms = [] } = useRooms();

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const openCreate = () => {
    setSelectedRoom(null);
    setIsCreating(true);
  };

  const openEdit = (room: Room) => {
    setSelectedRoom(room);
    setIsCreating(false);
  };

  const closeModal = () => {
    setSelectedRoom(null);
    setIsCreating(false);
  };

  return {
    rooms,
    selectedRoom,
    isModalOpen: isCreating || !!selectedRoom,
    openCreate,
    openEdit,
    closeModal,
  };
};
