import { Dialog } from "@mui/material";
import { noop } from "lodash";
import { EventBookingForm } from "./EventBookingForm";
import { EventConfirmation } from "./EventConfirmation";
import { useEventBookingCreation } from "../../hooks/useEventBookingCreation";
import type { EventMapped } from "../../types/rooms";

type Props = {
  open: boolean;
  onClose: () => void;
  event: EventMapped;
  startDate: string;
  startFrom: string;
  durationHours: number;
};

export function EventBookingModal({
  open,
  onClose,
  event,
  startDate,
  startFrom,
  durationHours,
}: Readonly<Props>) {
  const { isSuccess, bookingCode, submitButtonDisabled, isPending, handleChange, handleSubmit } =
    useEventBookingCreation({ event, startDate, startFrom, durationHours });

  return (
    <Dialog open={open} onClose={isSuccess ? noop : onClose} fullWidth>
      {isSuccess && bookingCode ? (
        <EventConfirmation
          bookingCode={bookingCode}
          event={event}
          startDate={startDate}
          startFrom={startFrom}
          durationHours={durationHours}
          onClose={onClose}
        />
      ) : (
        <EventBookingForm
          event={event}
          startDate={startDate}
          startFrom={startFrom}
          durationHours={durationHours}
          submitButtonDisabled={submitButtonDisabled}
          isPending={isPending}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          onClose={onClose}
        />
      )}
    </Dialog>
  );
}
