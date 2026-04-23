import type { CreateRoomBookingForm, CreateRoomBookingPayload } from "../types/rooms";

export type CreateRoomBookingExtra = {
  form: CreateRoomBookingForm;
  eventId: number;
  startDate: string;
  endDate: string;
};

export type CreateEventBookingExtra = {
  form: CreateRoomBookingForm;
  eventId: number;
  startDate: string;
  startFrom: string;
  durationHours: number;
};

type ApiBookErrorFormResponse = {
  email?: string[];
  telefono?: string[];
  nombre?: string[];
  apellido_1?: string[];
  observaciones?: string[];
};

export const mapBookingRoomToApi = (
  form: CreateRoomBookingForm,
  extra: Omit<CreateRoomBookingExtra, "form">,
): CreateRoomBookingPayload => {
  return {
    nombre: form.name,
    apellido_1: form.lastName,
    email: form.email,
    telefono: form.phone,
    observaciones: form.notes,
    habitacion: extra.eventId,
    fecha_inicio: extra.startDate,
    fecha_fin: extra.endDate,
  };
};

export const mapBookingEventToApi = (
  form: CreateRoomBookingForm,
  extra: Omit<CreateEventBookingExtra, "form">,
) => {
  return {
    nombre: form.name,
    apellido_1: form.lastName,
    email: form.email,
    telefono: form.phone,
    observaciones: form.notes,
    sala: extra.eventId,
    fecha: extra.startDate,
    hora_inicio: extra.startFrom,
    numero_horas: extra.durationHours,
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
