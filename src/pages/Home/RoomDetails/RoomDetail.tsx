import { CircularProgress, Grid } from "@mui/material";
import { useRooms, useRoomsByAvailability } from "../../../api/rooms";
import { RoomCard } from "../../../components/RoomCard/RoomCard";
import { noop } from "lodash";
import { useMapAmenitiesOnRoomType } from "../../../hooks/useMapAmenitiesOnRoomType";
import { useRoomSearchParams } from "../../../hooks/useRoomSearchParams";

function RoomDetails() {
  const { mapAmenitiesOnRoomType } = useMapAmenitiesOnRoomType();
  const { startDate, endDate, people, hasFilters } = useRoomSearchParams();

  const generalQuery = useRooms();

  const availabilityQuery = useRoomsByAvailability(
    {
      startDate: startDate!,
      endDate: endDate!,
      people: people!,
    },
    {
      enabled: hasFilters,
    },
  );

  const rooms = hasFilters ? availabilityQuery.data : generalQuery.data;
  const isLoading = hasFilters ? availabilityQuery.isLoading : generalQuery.isLoading;

  if (isLoading) return <CircularProgress />;
  if (!rooms) return <span>No rooms</span>;

  return (
    <Grid container flexDirection={"column"} gap={3}>
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          onEdit={noop}
          mapAmenitiesOnRoomType={mapAmenitiesOnRoomType}
          isSearch={hasFilters}
        />
      ))}
    </Grid>
  );
}

export default RoomDetails;
