export interface Room {
  id: number;
  name: string;
  price: number;
  squareMeters: number;
  maxGuests: number;
  bedType: string;
  sight: string;
  image: string;
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
