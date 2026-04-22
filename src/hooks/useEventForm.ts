import { useMemo, useState } from "react";
import { useCreateEvent, useCreateEventSchedule, useUpdateEvent } from "../api/rooms.hooks";
import type { EventMapped, EventRequest, EventSchedule } from "../types/rooms";

const days = [
  { label: "Lunes", value: 0 },
  { label: "Martes", value: 1 },
  { label: "Miércoles", value: 2 },
  { label: "Jueves", value: 3 },
  { label: "Viernes", value: 4 },
  { label: "Sábado", value: 5 },
  { label: "Domingo", value: 6 },
];

export const useEventForm = (original: EventMapped | null, onClose: () => void) => {
  const isEdit = !!original;

  const { mutateAsync: createEvent } = useCreateEvent();
  const { mutateAsync: createSchedule } = useCreateEventSchedule();

  const { mutate: editEvent } = useUpdateEvent();

  const [form, setForm] = useState<Omit<EventRequest, "horarios">>({
    name: original?.name ?? "",
    description: original?.description ?? "",
    capacity: original?.capacity ?? 1,
    pricePerHour: original?.pricePerHour ?? 0,
    status: original?.status ?? "DISPONIBLE",
    image: undefined,
  });

  const [sameSchedule, setSameSchedule] = useState(false);

  const [commonSchedule, setCommonSchedule] = useState({
    startTime: "",
    endTime: "",
  });

  const [schedules, setSchedules] = useState<
    { dayOfWeek: number; startTime: string; endTime: string }[]
  >([]);

  const selectedDays = useMemo(() => schedules.map((s) => s.dayOfWeek), [schedules]);

  const getAvailableDays = (index: number) =>
    days.filter((d) => !selectedDays.includes(d.value) || schedules[index]?.dayOfWeek === d.value);

  const handleChange = (field: keyof EventRequest) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [field]:
        field === "capacity" || field === "pricePerHour" ? Number(e.target.value) : e.target.value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setForm((prev) => ({ ...prev, image: file ?? undefined }));
  };

  const handleAddSchedule = () => {
    setSchedules((prev) => [...prev, { dayOfWeek: 0, startTime: "", endTime: "" }]);
  };

  const handleScheduleChange = (index: number, field: string, value: string | number) => {
    setSchedules((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  };

  const isTimeValid = (start: string, end: string) => start && end && start < end;

  const isValidEvent =
    form.name.trim() && form.description.trim() && form.capacity > 0 && form.pricePerHour > 0;

  const isValidSchedule = sameSchedule
    ? isTimeValid(commonSchedule.startTime, commonSchedule.endTime)
    : schedules.length > 0 && schedules.every((s) => isTimeValid(s.startTime, s.endTime));

  const isDisabled = !isValidEvent || (!isEdit && !isValidSchedule);

  const buildSchedules = (eventId: number): EventSchedule[] => {
    if (sameSchedule) {
      return days.map((d) => ({
        sala: eventId,
        dia_semana: d.value,
        hora_inicio: `${commonSchedule.startTime}:00`,
        hora_fin: `${commonSchedule.endTime}:00`,
      }));
    }

    return schedules.map((s) => ({
      sala: eventId,
      dia_semana: s.dayOfWeek,
      hora_inicio: `${s.startTime}:00`,
      hora_fin: `${s.endTime}:00`,
    }));
  };

  const onSubmit = async () => {
    if (isDisabled) return;

    try {
      if (isEdit && original) {
        editEvent({
          id: original.id,
          ...form,
        });

        onClose();

        return;
      }

      const response = await createEvent(form);
      const eventId = response.data.id;

      const mappedSchedules = buildSchedules(eventId);
      await createSchedule(mappedSchedules);

      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return {
    isEdit,
    form,
    sameSchedule,
    commonSchedule,
    schedules,
    isDisabled,

    setSameSchedule,
    setCommonSchedule,

    handleChange,
    handleImageChange,
    handleAddSchedule,
    handleScheduleChange,
    getAvailableDays,

    onSubmit,
  };
};
