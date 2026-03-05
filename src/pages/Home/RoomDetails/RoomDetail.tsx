import { Box, CircularProgress } from "@mui/material";
import { useRooms } from "../../../api/rooms";
import { Fragment, useState } from "react";
import { RoomModal } from "../../../components/RoomModal/RoomModal";
import { RoomCard } from "../../../components/RoomCard/RoomCard";

function RoomDetails() {
  const { data: rooms, isLoading } = useRooms();
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

  if (isLoading) return <CircularProgress />;
  if (!rooms) return <span>No rooms</span>;

  return (
    <Fragment>
      <Box>
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} onViewDetails={setSelectedRoomId} />
        ))}
      </Box>

      {!!selectedRoomId && (
        <RoomModal
          roomId={selectedRoomId}
          open={Boolean(selectedRoomId)}
          onClose={() => setSelectedRoomId(null)}
        />
      )}
    </Fragment>
  );
}

export default RoomDetails;
