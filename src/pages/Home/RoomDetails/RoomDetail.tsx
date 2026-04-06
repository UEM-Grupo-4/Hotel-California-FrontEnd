import { Grid } from "@mui/material";
import { useRoomsByAvailability } from "../../../api/rooms";
import { RoomCard } from "../../../components/RoomCard/RoomCard";
import { isEmpty, noop } from "lodash";
import { useMapAmenitiesOnRoomType } from "../../../hooks/useMapAmenitiesOnRoomType";
import { useRoomSearchParams } from "../../../hooks/useRoomSearchParams";
import { BookingModal } from "../../../components/BookingModal/BookingModal";
import { useMemo, useState } from "react";
import type { Room } from "../../../types/rooms";
import dayjs from "dayjs";
import { LoadingPage } from "../../../components/LoadingPage/LoadingPage";

function RoomDetails() {
  const { mapAmenitiesOnRoomType } = useMapAmenitiesOnRoomType();
  const [roomToBeBooked, setRoomToBeBooked] = useState<Room | undefined>(undefined);
  const { startDate, endDate, people, hasFilters } = useRoomSearchParams();

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

  const rooms = hasFilters ? availabilityQuery.data : [];
  const isLoading = hasFilters ? availabilityQuery.isLoading : false;

  const nights = useMemo(
    () => (startDate && endDate ? dayjs(endDate).diff(dayjs(startDate), "day") : 0),
    [startDate, endDate],
  );
  if (!availabilityQuery.isFetched) return <></>;
  if (isLoading) return <LoadingPage open={isLoading} />;
  if (isEmpty(rooms) || !rooms) return <span>No rooms</span>;

  return (
    <Grid container flexDirection={"column"} gap={3} sx={{ p: 3 }}>
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          onEdit={noop}
          mapAmenitiesOnRoomType={mapAmenitiesOnRoomType}
          onBookRoom={setRoomToBeBooked}
          isSearch={hasFilters}
          nights={nights}
        />
      ))}
      {roomToBeBooked && (
        <BookingModal
          open={!!roomToBeBooked}
          onClose={() => setRoomToBeBooked(undefined)}
          room={roomToBeBooked}
          startDate={startDate!}
          endDate={endDate!}
        />
      )}
    </Grid>
  );
}

export default RoomDetails;
