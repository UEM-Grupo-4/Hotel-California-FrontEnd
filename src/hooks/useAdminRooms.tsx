import { useState } from "react";
import { useRooms } from "../api/rooms";

export const useAdminRooms = () => {
  const { data: rooms = [] } = useRooms();

  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const openCreate = () => {
    setSelectedRoomId(null);
    setIsCreating(true);
  };

  const openEdit = (roomId: number) => {
    setSelectedRoomId(roomId);
    setIsCreating(false);
  };

  const closeModal = () => {
    setSelectedRoomId(null);
    setIsCreating(false);
  };

  return {
    rooms,
    selectedRoomId,
    isModalOpen: isCreating || selectedRoomId !== null,
    openCreate,
    openEdit,
    closeModal,
  };
};
