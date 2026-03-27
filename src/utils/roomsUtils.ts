import type { CreateRoomBookingForm, CreateRoomBookingPayload } from "../types/rooms";

export type CreateRoomBookingExtra = {
  form: CreateRoomBookingForm;
  roomId: number;
  startDate: string;
  endDate: string;
};

type ApiBookErrorFormResponse = {
  email?: string[];
  telefono?: string[];
  nombre?: string[];
  apellido_1?: string[];
  observaciones?: string[];
};

export const mapBookingToApi = (
  form: CreateRoomBookingForm,
  extra: Omit<CreateRoomBookingExtra, "form">,
): CreateRoomBookingPayload => {
  return {
    nombre: form.name,
    apellido_1: form.lastName,
    email: form.email,
    telefono: form.phone,
    observaciones: form.notes,
    habitacion: extra.roomId,
    fecha_inicio: extra.startDate,
    fecha_fin: extra.endDate,
  };
};

export const mapApiErrors = (apiErrors: ApiBookErrorFormResponse) => {
  return {
    email: apiErrors.email?.[0],
    phone: apiErrors.telefono?.[0],
    name: apiErrors.nombre?.[0],
    lastName: apiErrors.apellido_1?.[0],
    notes: apiErrors.observaciones?.[0],
  };
};
