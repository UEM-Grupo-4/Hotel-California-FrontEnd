import { CircularProgress, Grid } from "@mui/material";
import { useRooms } from "../../../api/rooms";
import { RoomCard } from "../../../components/RoomCard/RoomCard";
import { noop } from "lodash";

function RoomDetails() {
  const { data: rooms, isLoading } = useRooms();

  if (isLoading) return <CircularProgress />;
  if (!rooms) return <span>No rooms</span>;

  return (
    <Grid container flexDirection={"column"} gap={3}>
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} onEdit={noop} />
      ))}
    </Grid>
  );
}

export default RoomDetails;
