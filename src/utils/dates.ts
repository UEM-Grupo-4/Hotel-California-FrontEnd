import dayjs from "dayjs";
import type { RoomFiltersParams, RoomFiltersUI } from "../types/rooms";

export const mapFiltersToParams = (filters: RoomFiltersUI): RoomFiltersParams | null => {
  if (!filters.startDate || !filters.endDate) return null;

  return {
    startDate: dayjs(filters.startDate).format("YYYY-MM-DD"),
    endDate: dayjs(filters.endDate).format("YYYY-MM-DD"),
    people: filters.people,
    type: filters.type,
  };
};
