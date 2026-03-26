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

export type RoomRequest = Omit<Room, "id" | "image"> & { image?: File };

export type RoomUpdate = Omit<Room, "image"> & { image?: File };

export type RoomTypeRequest = Omit<RoomType, "id">;

export type AmenityRequest = Omit<Amenity, "id">;
