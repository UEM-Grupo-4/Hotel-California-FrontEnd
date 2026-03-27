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
};

export type RoomFiltersUI = {
  startDate?: PickerValue;
  endDate?: PickerValue;
  people: number;
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
  fecha_inicio: string;
  fecha_fin: string;
};

export type RoomMeetingDetail = {
  sala: number;
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
