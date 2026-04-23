import { useState } from "react";
import type { EventMapped } from "../types/rooms";
import { useCreateEventBooking } from "../api/rooms.hooks";

interface Props {
  event: EventMapped;
  startDate: string;
  startFrom: string;
  durationHours: number;
}

export const useEventBookingCreation = ({ event, startDate, startFrom, durationHours }: Props) => {
  const { mutate: createEventBookMutation, isSuccess, isPending } = useCreateEventBooking();
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [bookingCode, setBookingCode] = useState<string | null>(null);

  const submitButtonDisabled =
    !form.name || !form.lastName || !form.email || !form.phone || isPending;

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    createEventBookMutation(
      {
        form,
        startDate,
        startFrom,
        durationHours,
        eventId: event?.id ?? 0,
      },
      {
        onSuccess: (response) => {
          const code = response?.code;
          setBookingCode(code);
        },
      },
    );
  };

  return {
    form,
    isSuccess,
    bookingCode,
    isPending,
    submitButtonDisabled,
    handleChange,
    handleSubmit,
  };
};
