import { Dialog } from "@mui/material";

import type { Room } from "../../types/rooms";
import { ConfirmationContent } from "./ConfirmationContent";
import { useBookingCreation } from "../../hooks/useBookingCreation";
import { BookingForm } from "./BookingForm";
import { noop } from "lodash";

type Props = {
  open: boolean;
  onClose: () => void;
  room: Room;
  startDate: string;
  endDate: string;
};

export function BookingModal({ open, onClose, room, startDate, endDate }: Readonly<Props>) {
  const {
    isSuccess,
    bookingCode,
    errors,
    submitButtonDisabled,
    isPending,
    handleChange,
    handleSubmit,
  } = useBookingCreation({ room, startDate, endDate });

  return (
    <Dialog open={open} onClose={isSuccess ? noop : onClose} fullWidth>
      {isSuccess && bookingCode ? (
        <ConfirmationContent
          bookingCode={bookingCode}
          onClose={onClose}
          room={room}
          startDate={startDate}
          endDate={endDate}
        />
      ) : (
        <BookingForm
          room={room}
          startDate={startDate}
          endDate={endDate}
          errors={errors}
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
