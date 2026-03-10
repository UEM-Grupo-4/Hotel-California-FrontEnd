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

export type RoomRequest = Omit<Room, "id" | "image"> & { image?: File };

export type RoomUpdate = Omit<Room, "image"> & { image?: File };

export type RoomTypeRequest = Omit<RoomType, "id">;

export type AmenityRequest = Omit<Amenity, "id">;
