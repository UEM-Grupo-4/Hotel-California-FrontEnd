import type { RoomFiltersParams } from "../types/rooms";

export const roomsKeys = {
  all: ["rooms"] as const,
  byAvailability: (params: RoomFiltersParams) => ["rooms", "availability", params] as const,
  types: ["rooms-types"] as const,
  amenities: ["amenities"] as const,
  booking: (code?: string, email?: string) => ["booking", code, email] as const,
  bookingsApprovals: ["bookings-approvals"] as const,
};
