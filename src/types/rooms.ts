import type { PickerValue } from "@mui/x-date-pickers/internals";

export interface Room {
  id: number;
  number: string;
  description: string;
  type?: RoomType;
  image?: string;
}

export interface RoomType {
  id: number;
  name: string;
  capacity: number;
  price_per_night: number;
  amenities: number[];
}

export interface Amenity {
  id: number;
  name: string;
}

export type RoomFiltersParams = {
  startDate: string;
  endDate: string;
  people: number;
  type?: string;
};

export type EventFilterParams = {
  start?: string;
  startFrom?: string;
  durationHours?: number;
  people?: number;
};

export type EventMapped = {
  id?: number;
  name: string;
  capacity: number;
  description: string;
  pricePerHour: number;
  status: "DISPONIBLE" | "MANTENIMIENTO" | "FUERA_DE_SERVICIO";
  image?: string;
  times?: EventSchedule[];
};

export type EventSchedule = {
  sala?: number;
  dia_semana: number;
  hora_inicio: string;
  hora_fin: string;
};

export type RoomFiltersUI = {
  type: string;
  startDate?: PickerValue;
  endDate?: PickerValue;
  people: number;

  eventStart?: PickerValue;
  durationHours?: number;
};

export type CreateRoomBookingForm = {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  notes?: string;
};

export type CreateRoomBookingPayload = Omit<Customer, "id"> &
  RoomBookingDetail & {
    telefono: string;
    observaciones?: string;
  };

export type MyBookReservation = {
  code?: string;
  email?: string;
};

export type BookingStatus = "PENDIENTE" | "CONFIRMADA" | "RECHAZADA" | "CANCELADA";

export type BookingType = "HABITACION" | "SALA";

export type Customer = {
  id: number;
  nombre: string;
  apellido_1: string;
  apellido_2?: string;
  email: string;
};

export type RoomBookingDetail = {
  habitacion: number;
  nombre_habitacion?: string;
  numero_habitacion?: string;
  fecha_inicio: string;
  fecha_fin: string;
};

export type RoomMeetingDetail = {
  sala: number | { id: number; nombre?: string; name?: string };
  nombre?: string;
  nombre_sala?: string;
  sala_nombre?: string;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
};

export type Booking = {
  id: number;
  code: string;
  fecha_creacion: string;
  estado: BookingStatus;
  tipo_reserva: BookingType;
  observaciones: string;

  cliente: Customer;

  reserva_habitacion: RoomBookingDetail | null;
  reserva_sala: RoomMeetingDetail | null;
};

export type RoomRequest = Omit<Room, "id" | "image"> & { image?: File };

export type RoomUpdate = Omit<Room, "image"> & { image?: File };

export type RoomTypeRequest = Omit<RoomType, "id">;

export type AmenityRequest = Omit<Amenity, "id">;

export type RoomWithRoomTypeIdNumber = Omit<Room, "type"> & { type: number };

export type EventRequest = Omit<EventMapped, "id" | "image"> & {
  image?: File;
};

export type EventUpdate = Omit<EventMapped, "image"> & { image?: File };
