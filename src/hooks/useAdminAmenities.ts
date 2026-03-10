import { useState } from "react";
import { useRoomsAmenities } from "../api/rooms";
import type { RoomType } from "../types/rooms";

export const useAdminAmenities = () => {
  const { data: amenities = [] } = useRoomsAmenities();

  const [selectedAmenity, setSelectedAmenity] = useState<RoomType | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const openCreate = () => {
    setSelectedAmenity(null);
    setIsCreating(true);
  };

  const openEdit = (amenity: RoomType) => {
    setSelectedAmenity(amenity);
    setIsCreating(false);
  };

  const closeModal = () => {
    setSelectedAmenity(null);
    setIsCreating(false);
  };

  return {
    amenities,
    selectedAmenity,
    isModalOpen: isCreating || !!selectedAmenity,
    openCreate,
    openEdit,
    closeModal,
  };
};
