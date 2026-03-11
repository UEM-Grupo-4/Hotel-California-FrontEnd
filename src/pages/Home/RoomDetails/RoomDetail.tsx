import { CircularProgress, Grid } from "@mui/material";
import { useRooms } from "../../../api/rooms";
import { RoomCard } from "../../../components/RoomCard/RoomCard";
import { noop } from "lodash";
import { useMapAmenitiesOnRoomType } from "../../../hooks/useMapAmenitiesOnRoomType";

function RoomDetails() {
  const { data: rooms, isLoading } = useRooms();
  const { mapAmenitiesOnRoomType } = useMapAmenitiesOnRoomType();

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
        />
      ))}
    </Grid>
  );
}

export default RoomDetails;
