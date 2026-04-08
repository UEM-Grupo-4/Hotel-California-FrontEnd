import { useCallback } from "react";
import type { Amenity } from "../types/rooms";
import { useRoomsAmenities } from "../api/rooms.hooks";

const findAmenityForRoomType = (roomTypeId: number, amenities: Amenity[]) => {
  return amenities.find((amenity) => amenity.id === roomTypeId);
};

export const useMapAmenitiesOnRoomType = () => {
  const { data: amenities = [] } = useRoomsAmenities();

  const mapAmenitiesOnRoomType = useCallback(
    (amenityId: number) => {
      return findAmenityForRoomType(amenityId, amenities);
    },
    [amenities],
  );

  return {
    mapAmenitiesOnRoomType,
  };
};
