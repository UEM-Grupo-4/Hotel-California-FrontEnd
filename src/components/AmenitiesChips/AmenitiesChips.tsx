import { Chip, Stack } from "@mui/material";
import { memo, useMemo } from "react";
import type { Amenity } from "../../types/rooms";

interface Props {
  amenities: number[];
  mapAmenitiesOnRoomType: (amenityId: number) => Amenity | undefined;
}

function AmenitiesChips({ amenities, mapAmenitiesOnRoomType }: Readonly<Props>) {
  const mappedAmenities = useMemo(() => {
    return amenities?.map((amenityId) => mapAmenitiesOnRoomType(amenityId));
  }, [amenities, mapAmenitiesOnRoomType]);

  return (
    <Stack direction="row" flexWrap="wrap" gap={1} mt={2}>
      {mappedAmenities?.map((amenity) => {
        if (amenity) return <Chip key={amenity.id} label={amenity.name} size="small" />;
      })}
    </Stack>
  );
}

export default memo(AmenitiesChips);
