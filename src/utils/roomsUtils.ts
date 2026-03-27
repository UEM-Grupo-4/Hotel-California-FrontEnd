import type { CreateRoomBookingForm, CreateRoomBookingPayload } from "../types/rooms";

export type CreateRoomBookingExtra = {
  form: CreateRoomBookingForm;
  roomId: number;
  startDate: string;
  endDate: string;
};

export const mapBookingToApi = (
  form: CreateRoomBookingForm,
  extra: Omit<CreateRoomBookingExtra, "form">,
): CreateRoomBookingPayload => {
  return {
    nombre: form.name,
    apellido_1: form.lastName1,
    apellido_2: form.lastName2,
    email: form.email,
    telefono: form.phone,
    observaciones: form.notes,
    habitacion: extra.roomId,
    fecha_inicio: extra.startDate,
    fecha_fin: extra.endDate,
  };
};
