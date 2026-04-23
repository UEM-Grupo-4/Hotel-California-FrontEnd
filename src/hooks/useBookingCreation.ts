import { useMemo, useState } from "react";
import type { CreateRoomBookingForm, Room } from "../types/rooms";
import { mapApiErrors } from "../utils/roomsUtils";
import { showSuccess } from "../utils/showNotification";
import { useCreateRoomBooking } from "../api/rooms.hooks";
interface Props {
  room: Room;
  startDate: string;
  endDate: string;
}

export function useBookingCreation({ room, startDate, endDate }: Props) {
  const { mutate, isPending, isSuccess } = useCreateRoomBooking();
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [bookingCode, setBookingCode] = useState<string | null>(null);
  const [form, setForm] = useState<CreateRoomBookingForm>({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  });

  const handleChange = (key: keyof CreateRoomBookingForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const submitButtonDisabled = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { notes, ...rest } = form;

    return Object.values(rest).some((value) => !value);
  }, [form]);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.phone) return;

    mutate(
      {
        form,
        eventId: room.id,
        startDate,
        endDate,
      },
      {
        onSuccess: (data) => {
          const code = data.code;
          setBookingCode(code);
          showSuccess("Reserva generada con éxito");
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          const apiErrors = error?.response?.data;
          const mappedErrors = mapApiErrors(apiErrors);
          setErrors(mappedErrors);
        },
      },
    );
  };

  return {
    bookingCode,
    errors,
    submitButtonDisabled,
    isPending,
    isSuccess,
    handleChange,
    handleSubmit,
  };
}
