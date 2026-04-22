import { Grid } from "@mui/material";
import { isEmpty, noop } from "lodash";
import { useState } from "react";
import { LoadingPage } from "../../../components/LoadingPage/LoadingPage";
import type { EventMapped } from "../../../types/rooms";
import { EventCard } from "./EventCard";
import { useEventSearchParams } from "../../../hooks/useEventSearchParams";
import { useEventByAvailability } from "../../../api/rooms.hooks";

function EventDetails() {
  const [eventToBeBooked, setEventToBeBooked] = useState<EventMapped | undefined>();
  console.log(eventToBeBooked);

  const { durationHours, startDate, startFrom, people, hasFilters } = useEventSearchParams();

  const availabilityQuery = useEventByAvailability(
    {
      start: startDate!,
      startFrom: startFrom!,
      durationHours: Number(durationHours ?? 1),
      people: people!,
    },
    {
      enabled: hasFilters,
    },
  );

  const events = hasFilters ? availabilityQuery.data : [];
  const isLoading = hasFilters ? availabilityQuery.isLoading : false;

  if (!hasFilters) return <></>;
  if (isLoading) return <LoadingPage open={isLoading} />;
  if (isEmpty(events) || !events) return <span>No events</span>;

  return (
    <Grid container flexDirection={"column"} gap={3} sx={{ p: 3 }}>
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onEdit={noop}
          isSearch={hasFilters}
          durationHours={Number(durationHours)}
          onBookEvent={setEventToBeBooked}
        />
      ))}
    </Grid>
  );
}

export default EventDetails;
